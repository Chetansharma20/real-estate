import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

  const covers = [
    { name: 'dosti eden', file: 'dosti eden.jpg', folder: 'dosti eden' },
    { name: 'dosti mezzo 22', file: 'mezzo cover.jpg', folder: 'dosti mezzo 22' },
  ];

  for (const item of covers) {
    const project = await prisma.project.findFirst({
      where: {
        title: {
          contains: item.name,
          mode: 'insensitive'
        }
      }
    });

    if (project) {
      console.log(`Updating cover for ${project.title}`);
      const url = `${BASE_URL}/uploads/${encodeURIComponent(item.folder)}/${encodeURIComponent(item.file)}`;

      // Unset all covers for this project
      await prisma.projectMedia.updateMany({
        where: { projectId: project.id, isCover: true, configurationId: null },
        data: { isCover: false }
      });

      // Check if this media already exists
      let media = await prisma.projectMedia.findFirst({
        where: { projectId: project.id, url }
      });

      if (media) {
        await prisma.projectMedia.update({
          where: { id: media.id },
          data: { isCover: true }
        });
      } else {
        await prisma.projectMedia.create({
          data: {
            projectId: project.id,
            url,
            type: 'IMAGE',
            isCover: true,
            sortOrder: -1 // To put it first
          }
        });
      }
      console.log(`Set ${item.file} as cover for ${project.title}`);
    } else {
      console.log(`Project not found for ${item.name}`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
