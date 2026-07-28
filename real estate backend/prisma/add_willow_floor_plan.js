const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding floor plan for Dosti Willow...");

  const project = await prisma.project.findFirst({
    where: { title: { contains: 'willow', mode: 'insensitive' } },
    include: { configurations: true }
  });

  if (!project) {
    console.error("Dosti Willow project not found!");
    process.exit(1);
  }

  // Source uploaded image
  const brainDir = 'C:\\Users\\Chetan\\.gemini\\antigravity-ide\\brain\\1c997e03-3e6a-4d96-ac99-1226d4536660';
  const imgPath = path.join(brainDir, 'media__1784915103174.png');

  // Target uploads directory
  const targetDir = path.join(__dirname, '../uploads/dosti willow');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const destPath = path.join(targetDir, 'floor_plan_3bhk.png');
  fs.copyFileSync(imgPath, destPath);
  console.log("Copied floor plan image to uploads/dosti willow/floor_plan_3bhk.png");

  const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
  const fileUrl = `${BASE_URL}/uploads/dosti%20willow/floor_plan_3bhk.png`;

  // Get or create 3 BHK configuration
  let config = project.configurations.find(c => c.bhk === 3);
  if (!config) {
    config = await prisma.projectConfiguration.create({
      data: {
        projectId: project.id,
        bhk: 3,
        label: '3 BHK Premium',
        carpetArea: 1200,
        totalPrice: 15000000
      }
    });
  }

  // Add Floor Plan media
  await prisma.projectMedia.deleteMany({
    where: {
      projectId: project.id,
      configurationId: config.id,
      type: 'FLOOR_PLAN'
    }
  });

  await prisma.projectMedia.create({
    data: {
      projectId: project.id,
      configurationId: config.id,
      url: fileUrl,
      type: 'FLOOR_PLAN',
      sortOrder: 0
    }
  });

  console.log("Successfully attached floor plan to Dosti Willow 3 BHK configuration!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
