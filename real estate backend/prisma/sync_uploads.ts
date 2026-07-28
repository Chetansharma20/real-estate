import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface ScannedFile {
  filePath: string;
  fileName: string;
  isFloorPlan: boolean;
  bhkFromPath: number | null; // parsed from path, e.g. "1bhk" folder
  bhkFromFileName: number | null; // parsed from file name, e.g. "2bhk.jpg"
  url: string;
}

async function main() {
  const uploadsDir = path.join(__dirname, '../uploads');
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

  if (!fs.existsSync(uploadsDir)) {
    console.error("Uploads directory not found!");
    return;
  }

  // Get all projects to map by name
  const projects = await prisma.project.findMany({
    include: {
      configurations: true
    }
  });
  const projectMap = new Map();
  for (const p of projects) {
    projectMap.set(p.title.toLowerCase().trim(), p);
    // Add alias mapping for Planet North to dosti real planet
    if (p.title.toLowerCase().includes("planet north")) {
      projectMap.set("dosti real planet", p);
    }
  }

  const projectFolders = fs.readdirSync(uploadsDir);

  for (const folder of projectFolders) {
    const folderPath = path.join(uploadsDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    // Find project
    const project = projectMap.get(folder.toLowerCase().trim());
    if (!project) {
       console.log(`No project found in database for folder: ${folder}`);
       continue;
    }

    const projId = project.id;
    console.log(`\n----------------------------------------`);
    console.log(`Syncing media for project: ${project.title} (ID: ${projId})`);

    // Clear old media for this project to avoid duplicates during resync
    await prisma.projectMedia.deleteMany({ where: { projectId: projId } });

    // Determine actual media folder (handling compressedImages)
    let actualMediaFolder = folderPath;
    if (fs.existsSync(path.join(folderPath, 'compressedImages'))) {
      actualMediaFolder = path.join(folderPath, 'compressedImages');
    }

    // Recursively scan all files in the directory
    const scannedFiles: ScannedFile[] = [];
    scanDirectory(actualMediaFolder, null, BASE_URL, scannedFiles);

    console.log(`Scanned ${scannedFiles.length} media files.`);

    const configurations = project.configurations;
    console.log(`Found ${configurations.length} configurations in database.`);

    // Group floor plans and flat images/other files
    const floorPlanFiles = scannedFiles.filter(f => f.isFloorPlan);
    const standardImages = scannedFiles.filter(f => !f.isFloorPlan);

    console.log(`Floor plans found: ${floorPlanFiles.length}`);
    console.log(`Standard images found: ${standardImages.length}`);

    let sortOrder = 0;

    // 1. Process and Map Floor Plans to ALL configurations
    if (floorPlanFiles.length > 0) {
      // Group floor plan files by BHK
      const floorPlansByBhk: Record<number, ScannedFile[]> = {};
      floorPlanFiles.forEach(fp => {
        const bhk = fp.bhkFromFileName || fp.bhkFromPath || 0;
        if (bhk > 0) {
          if (!floorPlansByBhk[bhk]) floorPlansByBhk[bhk] = [];
          floorPlansByBhk[bhk].push(fp);
        }
      });

      // Track which floor plan files were successfully linked
      const linkedFiles = new Set<string>();

      // Map each configuration to a floor plan
      // Keep map of BHK -> count of configs processed to distribute configurations
      const bhkIndexMap: Record<number, number> = {};

      for (const config of configurations) {
        const bhk = config.bhk;
        if (!bhkIndexMap[bhk]) bhkIndexMap[bhk] = 0;
        
        const matchingFiles = floorPlansByBhk[bhk] || [];
        let selectedFile: ScannedFile | null = null;

        if (matchingFiles.length > 0) {
          const fileIndex = bhkIndexMap[bhk] % matchingFiles.length;
          selectedFile = matchingFiles[fileIndex];
          bhkIndexMap[bhk]++;
        } else {
          // Fallback: If no bhk specific floor plan, use first floor plan file available
          selectedFile = floorPlanFiles[0];
        }

        if (selectedFile) {
          linkedFiles.add(selectedFile.filePath);
          await prisma.projectMedia.create({
            data: {
              projectId: projId,
              configurationId: config.id,
              url: selectedFile.url,
              type: "FLOOR_PLAN",
              sortOrder: sortOrder++
            }
          });
          console.log(`  Mapped floor plan "${path.basename(selectedFile.filePath)}" to config: ${config.bhk} BHK (${config.carpetArea} sq.ft)`);
        }
      }

      // If there are floor plan files that weren't linked to any config (e.g. general plans),
      // insert them at project level
      for (const fp of floorPlanFiles) {
        if (!linkedFiles.has(fp.filePath)) {
          await prisma.projectMedia.create({
            data: {
              projectId: projId,
              configurationId: null,
              url: fp.url,
              type: "FLOOR_PLAN",
              sortOrder: sortOrder++
            }
          });
          console.log(`  Added project-level floor plan: "${path.basename(fp.filePath)}"`);
        }
      }
    }

    // 2. Process Standard Images (Cover, Flat Images, Amenities)
    let coverIndex = -1;

    // Priority 1: Filename contains "cover"
    for (let i = 0; i < standardImages.length; i++) {
      const img = standardImages[i];
      const fileNameLower = img.fileName.toLowerCase();
      if (fileNameLower.includes('cover')) {
        coverIndex = i;
        break;
      }
    }

    // Priority 2: Project-level, non-amenity image
    if (coverIndex === -1) {
      for (let i = 0; i < standardImages.length; i++) {
        const img = standardImages[i];
        const targetBhk = img.bhkFromPath || img.bhkFromFileName;
        const pathLower = img.filePath.toLowerCase().replace(/\\/g, '/');
        const isAmenity = pathLower.includes('/amenities/') || pathLower.includes('/amenity/');

        if (!targetBhk && !isAmenity) {
          coverIndex = i;
          break;
        }
      }
    }

    // Priority 3: Project-level image
    if (coverIndex === -1) {
      for (let i = 0; i < standardImages.length; i++) {
        const img = standardImages[i];
        const targetBhk = img.bhkFromPath || img.bhkFromFileName;
        if (!targetBhk) {
          coverIndex = i;
          break;
        }
      }
    }

    // Priority 4: Fallback to first standard image
    if (coverIndex === -1 && standardImages.length > 0) {
      coverIndex = 0;
    }

    for (let i = 0; i < standardImages.length; i++) {
      const img = standardImages[i];
      let configIdToLink: string | null = null;

      // If the image is inside a BHK folder (like "2 bhk/living_room.jpg"),
      // we can link it to the first configuration of that BHK type (or all matching configs if desired,
      // but standard project gallery usually has configId = null or links to specific BHK configurations).
      // Let's link it to the first matching BHK config to keep it organized.
      const targetBhk = img.bhkFromPath || img.bhkFromFileName;
      if (targetBhk) {
        const matchingConfig = configurations.find((c: any) => c.bhk === targetBhk);
        if (matchingConfig) {
          configIdToLink = matchingConfig.id;
        }
      }

      const isCover = i === coverIndex;

      await prisma.projectMedia.create({
        data: {
          projectId: projId,
          configurationId: configIdToLink,
          url: img.url,
          type: "IMAGE",
          isCover: isCover,
          sortOrder: sortOrder++
        }
      });
    }
    console.log(`Sync complete for: ${project.title}`);
  }

  console.log("\nMedia sync complete!");
}

function scanDirectory(
  dirPath: string, 
  currentBhkFolder: number | null, 
  baseUrl: string, 
  scannedFiles: ScannedFile[]
) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
       // Parse BHK from folder name if present
       const match = item.match(/(\d+)\s*bhk/i);
       const nextBhkFolder = match ? parseInt(match[1]) : currentBhkFolder;
       scanDirectory(itemPath, nextBhkFolder, baseUrl, scannedFiles);
    } else {
       // Check if file is image
       if (!item.match(/\.(jpg|jpeg|png|gif|webp)$/i)) continue;

       // Determine if file is floor plan:
       // Check if folder path contains 'floor plan', 'floor_plan', 'floor-plan'
       const pathLower = itemPath.toLowerCase().replace(/\\/g, '/');
       const isFloorPlan = pathLower.includes('/floor plan/') || 
                           pathLower.includes('/floor_plan/') || 
                           pathLower.includes('/floor-plan/') || 
                           item.toLowerCase().includes('floor');

       // Parse BHK from filename if present (e.g. "2 bhk (2).jpg" -> 2)
       const match = item.match(/(\d+)\s*bhk/i);
       const bhkFromFileName = match ? parseInt(match[1]) : null;

       // Construct URL
       const relativePath = path.relative(path.join(__dirname, '../uploads'), itemPath).replace(/\\/g, '/');
       const urlEncodedPath = relativePath.split('/').map((part: string) => encodeURIComponent(part)).join('/');
       const url = `${baseUrl}/uploads/${urlEncodedPath}`;

       scannedFiles.push({
         filePath: itemPath,
         fileName: item,
         isFloorPlan,
         bhkFromPath: currentBhkFolder,
         bhkFromFileName,
         url
       });
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
