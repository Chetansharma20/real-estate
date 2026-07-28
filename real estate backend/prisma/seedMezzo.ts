import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const township = await prisma.township.findFirst();
  if (!township) {
    console.log('No township found. Run seedDynamic first.');
    return;
  }

  // Create or find Dosti Mezzo 22
  let project = await prisma.project.findUnique({
    where: { slug: 'dosti-mezzo-22' }
  });

  if (!project) {
    project = await prisma.project.create({
      data: {
        title: 'Dosti Mezzo 22',
        slug: 'dosti-mezzo-22',
        townshipId: township.id,
        propertyType: 'APARTMENT',
        constructionStatus: 'UNDER_CONSTRUCTION',
        status: 'ACTIVE',
        featured: true,
      }
    });
    console.log('Created project: Dosti Mezzo 22');
  } else {
    console.log('Project Dosti Mezzo 22 already exists');
  }

  // Add Amenities
  const amenitiesList = [
    "Lobby Water Feature",
    "Cricket Practice Net",
    "Lounge Pavilion",
    "Fitness Area",
    "Children's Play Area",
    "Yoga Deck",
    "Cricket Lawn",
    "Reflexology Trail",
    "25 M Lap Pool with Deck",
    "Shallow Pool with Deck",
    "2 Banquet Halls with Outdoor Deck",
    "Aqua Play",
    "Lawn",
    "Gymnasium with changing room",
    "Indoor Games Area (Cards, Carrom, Chess, Table Tennis, Foosball, and Pool Table)",
    "Outdoor Gym",
    "BBQ Deck",
    "Viewing Deck",
    "Star Gazing Deck",
    "Rain Water Harvesting",
    "Sewage Treatment Plant (STP)",
    "Organic Waste Converter",
    "Solar PV Panels and Solar Street Lights",
    "Daylight-Based Control and LED Fittings",
    "Water Efficient Fixtures",
    "Low VOC Eco-friendly paints",
    "Native Trees used for Landscaping",
    "Natural Ventilation window designs",
    "Electric Car Charging Points",
    "Differently Abled Access features"
  ];

  for (const name of amenitiesList) {
    let amenity = await prisma.amenity.findUnique({ where: { name } });
    if (!amenity) {
      amenity = await prisma.amenity.create({ data: { name, category: 'General' } });
    }

    const existingProjectAmenity = await prisma.projectAmenity.findFirst({
      where: { projectId: project.id, amenityId: amenity.id }
    });

    if (!existingProjectAmenity) {
      await prisma.projectAmenity.create({
        data: { projectId: project.id, amenityId: amenity.id }
      });
    }
  }
  console.log('Amenities added.');

  // Create Configurations
  const configs = [
    { bhk: 3, label: '3 BHK', carpetArea: 900, pricePerSqft: 18000, totalPrice: 18000 * 900 },
    { bhk: 2, label: '2 BHK (639 sq ft)', carpetArea: 639, pricePerSqft: 18000, totalPrice: 18000 * 639 },
    { bhk: 2, label: '2 BHK (532 sq ft)', carpetArea: 532, pricePerSqft: 18000, totalPrice: 18000 * 532 },
  ];

  for (const config of configs) {
    let existingConfig = await prisma.projectConfiguration.findFirst({
      where: { projectId: project.id, label: config.label }
    });

    if (!existingConfig) {
      existingConfig = await prisma.projectConfiguration.create({
        data: {
          projectId: project.id,
          bhk: config.bhk,
          label: config.label,
          carpetArea: config.carpetArea,
          pricePerSqft: config.pricePerSqft,
          totalPrice: config.totalPrice,
          isAvailable: true
        }
      });
      console.log(`Created config: ${config.label}`);
    }
  }

  // Seed Media
  // Seed Media
  const uploadsDir = path.join(__dirname, '../uploads/dosti mezzo 22');
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

  if (fs.existsSync(uploadsDir)) {
    console.log("Syncing media for Dosti Mezzo 22");
    // Clear old media
    await prisma.projectMedia.deleteMany({ where: { projectId: project.id } });

    const items = fs.readdirSync(uploadsDir);
    let projectSortOrder = 0;

    for (const item of items) {
      const itemPath = path.join(uploadsDir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        // Map to configuration
        let configLabel = null;
        if (item.toLowerCase().includes('3 bhk')) configLabel = '3 BHK';
        else if (item.toLowerCase().includes('639')) configLabel = '2 BHK (639 sq ft)';
        else if (item.toLowerCase().includes('532')) configLabel = '2 BHK (532 sq ft)';

        if (configLabel) {
          const config = await prisma.projectConfiguration.findFirst({
            where: { projectId: project.id, label: configLabel }
          });

          if (config) {
            const configItems = fs.readdirSync(itemPath);
            let configSortOrder = 0;
            for (const cItem of configItems) {
              if (!cItem.match(/\.(jpg|jpeg|png|gif|webp)$/i)) continue;
              
              const relativePath = `dosti mezzo 22/${item}/${cItem}`.replace(/\\/g, '/');
              const urlEncodedPath = relativePath.split('/').map(part => encodeURIComponent(part)).join('/');
              const url = `${BASE_URL}/uploads/${urlEncodedPath}`;

              // Is this floor plan? User said "first image is 3bhk floor plan", etc. 
              // Usually they upload it separately via admin dashboard, but here they attached them.
              // Let's just store them as IMAGE unless filename says floor.
              const isFloorPlan = cItem.toLowerCase().includes('floor');

              await prisma.projectMedia.create({
                data: {
                  projectId: project.id,
                  configurationId: config.id,
                  url,
                  type: isFloorPlan ? 'FLOOR_PLAN' : 'IMAGE',
                  isCover: configSortOrder === 0,
                  sortOrder: configSortOrder++
                }
              });
            }
          }
        }
      } else {
        // Direct project media
        if (!item.match(/\.(jpg|jpeg|png|gif|webp)$/i)) continue;
        const relativePath = `dosti mezzo 22/${item}`.replace(/\\/g, '/');
        const urlEncodedPath = relativePath.split('/').map(part => encodeURIComponent(part)).join('/');
        const url = `${BASE_URL}/uploads/${urlEncodedPath}`;
        
        await prisma.projectMedia.create({
          data: {
            projectId: project.id,
            url,
            type: 'IMAGE',
            isCover: projectSortOrder === 0,
            sortOrder: projectSortOrder++
          }
        });
      }
    }
    console.log("Media seeded.");
  }

  console.log('Dosti Mezzo 22 setup completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
