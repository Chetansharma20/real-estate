const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const uploadsDir = path.join(__dirname, '../uploads');
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

  if (!fs.existsSync(uploadsDir)) {
    console.error("Uploads directory not found!");
    return;
  }

  // Get all projects to map by name
  const projects = await prisma.project.findMany();
  const projectMap = new Map();
  for (const p of projects) {
    projectMap.set(p.title.toLowerCase().trim(), p.id);
  }

  const projectFolders = fs.readdirSync(uploadsDir);

  for (const folder of projectFolders) {
    const folderPath = path.join(uploadsDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    // Find project ID
    let projId = projectMap.get(folder.toLowerCase().trim());
    
    // Sometimes the folder is named 'dosti tulip' but inside it has 'compressedImages'.
    let actualMediaFolder = folderPath;
    if (fs.existsSync(path.join(folderPath, 'compressedImages'))) {
      actualMediaFolder = path.join(folderPath, 'compressedImages');
    }

    if (projId) {
       console.log(`Syncing media for project: ${folder}`);
       // Clear old media for this project to avoid duplicates during resync
       await prisma.projectMedia.deleteMany({ where: { projectId: projId } });

       await processDirectory(actualMediaFolder, projId, null, BASE_URL, folder);
    } else {
       console.log(`No project found for folder: ${folder}`);
    }
  }

  console.log("Media sync complete!");
}

async function processDirectory(dirPath, projectId, configId, baseUrl, projectNamePath) {
  const items = fs.readdirSync(dirPath);
  let sortOrder = 0;

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
       // This is likely a configuration folder, e.g. "1BHK" or "2 bhk"
       const match = item.match(/(\d+)\s*bhk/i);
       if (match) {
          const bhk = parseInt(match[1]);
          // Find or create config
          let config = await prisma.projectConfiguration.findFirst({
            where: { projectId, bhk }
          });
          
          if (!config) {
            config = await prisma.projectConfiguration.create({
              data: {
                projectId,
                bhk,
                carpetArea: 500 * bhk, // Dummy value
                pricePerSqft: 15000,
                totalPrice: 15000 * 500 * bhk,
                label: `${bhk} BHK Premium`
              }
            });
            console.log(`Created missing config for ${bhk} BHK`);
          }

          await processDirectory(itemPath, projectId, config.id, baseUrl, projectNamePath);
       } else {
          // Unrecognized folder, just process files inside it as project level
          await processDirectory(itemPath, projectId, configId, baseUrl, projectNamePath);
       }
    } else {
       // It's a file
       if (!item.match(/\.(jpg|jpeg|png|gif|webp)$/i)) continue;

       const isFloorPlan = item.toLowerCase().includes("floor");
       
       // Construct URL based on uploads directory
       const relativePath = path.relative(path.join(__dirname, '../uploads'), itemPath).replace(/\\/g, '/');
       
       // URL encode parts of the path
       const urlEncodedPath = relativePath.split('/').map(part => encodeURIComponent(part)).join('/');
       const url = `${baseUrl}/uploads/${urlEncodedPath}`;

       await prisma.projectMedia.create({
         data: {
           projectId,
           configurationId: configId,
           url,
           type: isFloorPlan ? "FLOOR_PLAN" : "IMAGE",
           isCover: sortOrder === 0 && configId === null,
           sortOrder: sortOrder++
         }
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
