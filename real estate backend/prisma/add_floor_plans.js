const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding floor plans for Dosti Greater Thane 1 BHK configurations...");

  const project = await prisma.project.findFirst({
    where: { title: { contains: 'greater thane', mode: 'insensitive' } }
  });

  if (!project) {
    console.error("Dosti Greater Thane project not found!");
    process.exit(1);
  }

  // Paths to original uploaded images
  const brainDir = 'C:\\Users\\Chetan\\.gemini\\antigravity-ide\\brain\\1c997e03-3e6a-4d96-ac99-1226d4536660';
  const img1Path = path.join(brainDir, 'media__1784914436298.png');
  const img2Path = path.join(brainDir, 'media__1784914303964.png');

  // Destination folder
  const targetDir = path.join(__dirname, '../uploads/dosti greater thane');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const dest1 = path.join(targetDir, '1bhk_339_floor_plan.png');
  const dest2 = path.join(targetDir, '1bhk_385_floor_plan.png');

  fs.copyFileSync(img1Path, dest1);
  fs.copyFileSync(img2Path, dest2);

  console.log("Copied floor plan images to backend uploads folder.");

  const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
  const url1 = `${BASE_URL}/uploads/dosti%20greater%20thane/1bhk_339_floor_plan.png`;
  const url2 = `${BASE_URL}/uploads/dosti%20greater%20thane/1bhk_385_floor_plan.png`;

  // Upsert two 1 BHK configurations
  // Config 1: 339 sq.ft
  let config1 = await prisma.projectConfiguration.findFirst({
    where: { projectId: project.id, bhk: 1, carpetArea: 339 }
  });

  if (!config1) {
    // Check if there is an existing generic 1BHK config to update
    const genericConfig = await prisma.projectConfiguration.findFirst({
      where: { projectId: project.id, bhk: 1 }
    });

    if (genericConfig) {
      config1 = await prisma.projectConfiguration.update({
        where: { id: genericConfig.id },
        data: {
          label: '1 BHK (339 sq.ft)',
          carpetArea: 339,
          totalPrice: 6500000
        }
      });
    } else {
      config1 = await prisma.projectConfiguration.create({
        data: {
          projectId: project.id,
          bhk: 1,
          label: '1 BHK (339 sq.ft)',
          carpetArea: 339,
          totalPrice: 6500000
        }
      });
    }
  }

  // Config 2: 385 sq.ft
  let config2 = await prisma.projectConfiguration.findFirst({
    where: { projectId: project.id, bhk: 1, carpetArea: 385 }
  });

  if (!config2) {
    config2 = await prisma.projectConfiguration.create({
      data: {
        projectId: project.id,
        bhk: 1,
        label: '1 BHK (385 sq.ft)',
        carpetArea: 385,
        totalPrice: 7500000
      }
    });
  }

  // Attach Floor Plan media
  // Clear old floor plan media for these configs if any
  await prisma.projectMedia.deleteMany({
    where: {
      projectId: project.id,
      configurationId: { in: [config1.id, config2.id] },
      type: 'FLOOR_PLAN'
    }
  });

  await prisma.projectMedia.create({
    data: {
      projectId: project.id,
      configurationId: config1.id,
      url: url1,
      type: 'FLOOR_PLAN',
      sortOrder: 0
    }
  });

  await prisma.projectMedia.create({
    data: {
      projectId: project.id,
      configurationId: config2.id,
      url: url2,
      type: 'FLOOR_PLAN',
      sortOrder: 0
    }
  });

  console.log("Successfully attached floor plan images to 1 BHK (339 sq.ft) and 1 BHK (385 sq.ft) configurations!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
