const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding floor plans for Dosti Olive...");

  const project = await prisma.project.findFirst({
    where: { title: { contains: 'olive', mode: 'insensitive' } },
    include: { configurations: true }
  });

  if (!project) {
    console.error("Dosti Olive project not found!");
    process.exit(1);
  }

  // Source uploaded images
  const brainDir = 'C:\\Users\\Chetan\\.gemini\\antigravity-ide\\brain\\1c997e03-3e6a-4d96-ac99-1226d4536660';
  const img3bhkPath = path.join(brainDir, 'media__1784915762950.png'); // 1st image (3 BHK)
  const img1bhkPath = path.join(brainDir, 'media__1784915762953.png'); // 2nd image (1 BHK)
  const img2bhkPath = path.join(brainDir, 'media__1784915762961.png'); // 3rd image (2 BHK)

  // Target uploads directory
  const targetDir = path.join(__dirname, '../uploads/dosti olive');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const dest3bhk = path.join(targetDir, 'floor_plan_3bhk.png');
  const dest1bhk = path.join(targetDir, 'floor_plan_1bhk.png');
  const dest2bhk = path.join(targetDir, 'floor_plan_2bhk.png');

  fs.copyFileSync(img3bhkPath, dest3bhk);
  fs.copyFileSync(img1bhkPath, dest1bhk);
  fs.copyFileSync(img2bhkPath, dest2bhk);
  console.log("Copied floor plan images to uploads/dosti olive/");

  const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
  const url3bhk = `${BASE_URL}/uploads/dosti%20olive/floor_plan_3bhk.png`;
  const url1bhk = `${BASE_URL}/uploads/dosti%20olive/floor_plan_1bhk.png`;
  const url2bhk = `${BASE_URL}/uploads/dosti%20olive/floor_plan_2bhk.png`;

  const config3bhk = project.configurations.find(c => c.bhk === 3);
  const config1bhk = project.configurations.find(c => c.bhk === 1);
  const config2bhk = project.configurations.find(c => c.bhk === 2);

  if (config3bhk) {
    await prisma.projectMedia.deleteMany({
      where: { projectId: project.id, configurationId: config3bhk.id, type: 'FLOOR_PLAN' }
    });
    await prisma.projectMedia.create({
      data: { projectId: project.id, configurationId: config3bhk.id, url: url3bhk, type: 'FLOOR_PLAN', sortOrder: 0 }
    });
    console.log("Attached 3 BHK floor plan!");
  }

  if (config1bhk) {
    await prisma.projectMedia.deleteMany({
      where: { projectId: project.id, configurationId: config1bhk.id, type: 'FLOOR_PLAN' }
    });
    await prisma.projectMedia.create({
      data: { projectId: project.id, configurationId: config1bhk.id, url: url1bhk, type: 'FLOOR_PLAN', sortOrder: 0 }
    });
    console.log("Attached 1 BHK floor plan!");
  }

  if (config2bhk) {
    await prisma.projectMedia.deleteMany({
      where: { projectId: project.id, configurationId: config2bhk.id, type: 'FLOOR_PLAN' }
    });
    await prisma.projectMedia.create({
      data: { projectId: project.id, configurationId: config2bhk.id, url: url2bhk, type: 'FLOOR_PLAN', sortOrder: 0 }
    });
    console.log("Attached 2 BHK floor plan!");
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
