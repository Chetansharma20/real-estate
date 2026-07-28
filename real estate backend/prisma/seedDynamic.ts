import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

async function main() {
  console.log("Starting dynamic seed...");

  // Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const password = process.env.ADMIN_PASSWORD || '12345';
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        isVerified: true
      }
    });
    console.log(`Admin user created: ${adminEmail} / ${password}`);
  } else {
    const password = process.env.ADMIN_PASSWORD || '12345';
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: adminEmail },
      data: { password: hashedPassword }
    });
    console.log(`Admin user password updated/synced for: ${adminEmail}`);
  }

  // Clean up
  await prisma.projectMedia.deleteMany();
  await prisma.projectConfiguration.deleteMany();
  await prisma.projectAmenity.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.project.deleteMany();
  await prisma.township.deleteMany();

  // Create Master Township
  const township = await prisma.township.create({
    data: {
      name: "Dosti West County",
      slug: "dosti-west-county",
      description: "A premium residential township in Thane.",
      locality: "Thane",
      city: "Mumbai",
      address: "Phase 2, Off Ghodbunder Road, Near Orchids International School, Brahmand Road, Thane (West) - 400607"
    }
  });

  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.log("Uploads directory not found!");
    return;
  }

  const projectFolders = fs.readdirSync(uploadsDir).filter(f => fs.statSync(path.join(uploadsDir, f)).isDirectory());

  for (const projFolder of projectFolders) {
    const projPath = path.join(uploadsDir, projFolder);
    
    // Capitalize project name correctly
    const projectName = projFolder.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    console.log(`Processing project: ${projectName}...`);

    const project = await prisma.project.create({
      data: {
        title: projectName,
        slug: slugify(projectName),
        townshipId: township.id,
        propertyType: "APARTMENT",
        constructionStatus: "UNDER_CONSTRUCTION",
        status: "ACTIVE",
        featured: true,
      }
    });

    const items = fs.readdirSync(projPath);
    let projectMediaSortOrder = 0;

    for (const item of items) {
      const itemPath = path.join(projPath, item);
      const isDir = fs.statSync(itemPath).isDirectory();

      if (isDir) {
        const folderNameLower = item.toLowerCase();
        
        // Handle BHK configurations
        if (folderNameLower.includes('bhk')) {
          const bhkMatch = folderNameLower.match(/(\d+(?:\.\d+)?)/);
          const bhkNum = bhkMatch ? parseFloat(bhkMatch[1]) : 1;
          
          const config = await prisma.projectConfiguration.create({
            data: {
              projectId: project.id,
              bhk: Math.floor(bhkNum), // Schema uses Int for bhk
              label: `${bhkNum} BHK`,
              carpetArea: 500 * bhkNum, // Dummy data
              pricePerSqft: 18000, // Dummy data
              totalPrice: 500 * bhkNum * 18000,
              isAvailable: true
            }
          });

          // Read files inside BHK folder
          const configFiles = fs.readdirSync(itemPath).filter(f => fs.statSync(path.join(itemPath, f)).isFile());
          let configMediaSortOrder = 0;

          for (const file of configFiles) {
            const url = `http://localhost:5000/uploads/${encodeURIComponent(projFolder)}/${encodeURIComponent(item)}/${encodeURIComponent(file)}`;
            const isFloorPlan = file.toLowerCase().includes('floor_plan') || file.toLowerCase().includes('floorplan');
            const type = isFloorPlan ? "FLOOR_PLAN" : "IMAGE";
            const isCover = configMediaSortOrder === 0 && type === "IMAGE";

            await prisma.projectMedia.create({
              data: {
                projectId: project.id,
                configurationId: config.id,
                url: url,
                type: type,
                isCover: isCover,
                sortOrder: configMediaSortOrder++
              }
            });
          }
        } else {
           // It's a directory but not a BHK (e.g. Bathroom, compressedImages)
           const otherFiles = fs.readdirSync(itemPath).filter(f => fs.statSync(path.join(itemPath, f)).isFile());
           for (const file of otherFiles) {
             const url = `http://localhost:5000/uploads/${encodeURIComponent(projFolder)}/${encodeURIComponent(item)}/${encodeURIComponent(file)}`;
             await prisma.projectMedia.create({
              data: {
                projectId: project.id,
                url: url,
                type: "IMAGE",
                isCover: projectMediaSortOrder === 0,
                sortOrder: projectMediaSortOrder++
              }
            });
           }
        }
      } else {
        // It's a file directly under project folder
        const url = `http://localhost:5000/uploads/${encodeURIComponent(projFolder)}/${encodeURIComponent(item)}`;
        const isFloorPlan = item.toLowerCase().includes('floor_plan') || item.toLowerCase().includes('floorplan');
        const isBrochure = item.toLowerCase().includes('brochure') || item.toLowerCase().endsWith('.pdf');
        
        let type = "IMAGE";
        if (isFloorPlan) type = "FLOOR_PLAN";
        else if (isBrochure) type = "BROCHURE";

        await prisma.projectMedia.create({
          data: {
            projectId: project.id,
            url: url,
            type: type as any,
            isCover: projectMediaSortOrder === 0 && type === "IMAGE",
            sortOrder: projectMediaSortOrder++
          }
        });
      }
    }
  }

  console.log("Dynamic seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
