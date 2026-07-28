const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding floor plans for Dosti Nest...");

  const project = await prisma.project.findFirst({
    where: { title: { contains: 'nest', mode: 'insensitive' } },
    include: { configurations: true }
  });

  if (!project) {
    console.error("Dosti Nest project not found!");
    process.exit(1);
  }

  // Source uploaded images
  const brainDir = 'C:\\Users\\Chetan\\.gemini\\antigravity-ide\\brain\\1c997e03-3e6a-4d96-ac99-1226d4536660';
  const img2bhkPath = path.join(brainDir, 'media__1784915980705.png'); // 1st image (2 BHK)
  const img1bhkPath = path.join(brainDir, 'media__1784916090658.png'); // 2nd image (1 BHK)

  // Target uploads directory
  const targetDir = path.join(__dirname, '../uploads/dosti nest');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const dest2bhk = path.join(targetDir, 'floor_plan_2bhk.png');
  const dest1bhk = path.join(targetDir, 'floor_plan_1bhk.png');

  fs.copyFileSync(img2bhkPath, dest2bhk);
  fs.copyFileSync(img1bhkPath, dest1bhk);
  console.log("Copied floor plan images to uploads/dosti nest/");

  const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
  const url2bhk = `${BASE_URL}/uploads/dosti%20nest/floor_plan_2bhk.png`;
  const url1bhk = `${BASE_URL}/uploads/dosti%20nest/floor_plan_1bhk.png`;

  const config2bhk = project.configurations.find(c => c.bhk === 2);
  const config1bhk = project.configurations.find(c => c.bhk === 1);

  if (config2bhk) {
    await prisma.projectMedia.deleteMany({
      where: { projectId: project.id, configurationId: config2bhk.id, type: 'FLOOR_PLAN' }
    });
    await prisma.projectMedia.create({
      data: { projectId: project.id, configurationId: config2bhk.id, url: url2bhk, type: 'FLOOR_PLAN', sortOrder: 0 }
    });
    console.log("Attached 2 BHK floor plan!");
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
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
