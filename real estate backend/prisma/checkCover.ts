import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst({
    where: { slug: 'dosti-mezzo-22' },
    include: { media: true }
  });

  if (project) {
    const covers = project.media.filter((m: any) => m.isCover);
    console.log(`Found ${covers.length} covers for ${project.title}`);
    covers.forEach((c: any) => console.log(c.url, c.configurationId ? 'CONFIG_COVER' : 'PROJECT_COVER'));
  }
}

main().finally(() => prisma.$disconnect());
