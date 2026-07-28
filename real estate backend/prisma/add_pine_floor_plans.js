const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding floor plans for Dosti Pine...");

  const project = await prisma.project.findFirst({
    where: { title: { contains: 'pine', mode: 'insensitive' } },
    include: { configurations: true }
  });

  if (!project) {
    console.error("Dosti Pine project not found!");
    process.exit(1);
  }

  // Source uploaded images
  const brainDir = 'C:\\Users\\Chetan\\.gemini\\antigravity-ide\\brain\\1c997e03-3e6a-4d96-ac99-1226d4536660';
  const img3bhkPath = path.join(brainDir, 'media__1784915554001.png'); // 1st image (3 BHK)
  const img2bhkPath = path.join(brainDir, 'media__1784915553998.png'); // 2nd image (2 BHK)

  // Target uploads directory
  const targetDir = path.join(__dirname, '../uploads/dosti pine');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const dest3bhk = path.join(targetDir, 'floor_plan_3bhk.png');
  const dest2bhk = path.join(targetDir, 'floor_plan_2bhk.png');

  fs.copyFileSync(img3bhkPath, dest3bhk);
  fs.copyFileSync(img2bhkPath, dest2bhk);
  console.log("Copied floor plan images to uploads/dosti pine/");

  const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
  const url3bhk = `${BASE_URL}/uploads/dosti%20pine/floor_plan_3bhk.png`;
  const url2bhk = `${BASE_URL}/uploads/dosti%20pine/floor_plan_2bhk.png`;

  const config3bhk = project.configurations.find(c => c.bhk === 3);
  const config2bhk = project.configurations.find(c => c.bhk === 2);

  if (config3bhk) {
    await prisma.projectMedia.deleteMany({
      where: {
        projectId: project.id,
        configurationId: config3bhk.id,
        type: 'FLOOR_PLAN'
      }
    });

    await prisma.projectMedia.create({
      data: {
        projectId: project.id,
        configurationId: config3bhk.id,
        url: url3bhk,
        type: 'FLOOR_PLAN',
        sortOrder: 0
      }
    });
    console.log("Attached 3 BHK floor plan to Dosti Pine 3 BHK configuration!");
  }

  if (config2bhk) {
    await prisma.projectMedia.deleteMany({
      where: {
        projectId: project.id,
        configurationId: config2bhk.id,
        type: 'FLOOR_PLAN'
      }
    });

    await prisma.projectMedia.create({
      data: {
        projectId: project.id,
        configurationId: config2bhk.id,
        url: url2bhk,
        type: 'FLOOR_PLAN',
        sortOrder: 0
      }
    });
    console.log("Attached 2 BHK floor plan to Dosti Pine 2 BHK configuration!");
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
