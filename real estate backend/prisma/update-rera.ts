import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const reraMap = {
  "Dosti Mezzo 22": "P51900026976",
  "Dosti Willow": "P51700056278",
  "Dosti Tulip": "P51700032666",
  "Dosti Planet North": "P51700034985",
  "Dosti Pine": "P51700025834",
  "Dosti Olive": "P51700054037",
  "Dosti Nest": "PHASE -1 P51700033640",
  "Dosti Greater Thane": "P51700024923",
  "Dosti Eden": "P51700049421",
  "Dosti 604": "PR1330002502719"
};

async function main() {
  for (const [title, reraId] of Object.entries(reraMap)) {
    const project = await prisma.project.findFirst({
      where: { title }
    });
    if (project) {
      await prisma.project.update({
        where: { id: project.id },
        data: { reraId }
      });
      console.log(`✅ Updated ${title} with RERA ID: ${reraId}`);
    } else {
      console.log(`❌ Could not find project: ${title}`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
