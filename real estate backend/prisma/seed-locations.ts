import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Hardcoded accurate area coordinates for each project
// Based on known locations: Balkum (Thane W), Kalher (Thane), Shilphata, Sion
const PROJECT_COORDS: { titleContains: string; lat: number; lng: number; area: string }[] = [
  // Dosti West County Township — Balkum, Thane West
  { titleContains: "willow",        lat: 19.2212, lng: 72.9748, area: "Balkum, Thane West" },
  { titleContains: "tulip",         lat: 19.2205, lng: 72.9743, area: "Balkum, Thane West" },
  { titleContains: "olive",         lat: 19.2198, lng: 72.9751, area: "Balkum, Thane West" },
  { titleContains: "nest",          lat: 19.2220, lng: 72.9755, area: "Balkum, Thane West" },
  { titleContains: "pine",          lat: 19.2215, lng: 72.9760, area: "Balkum, Thane West" },
  { titleContains: "west county",   lat: 19.2208, lng: 72.9745, area: "Balkum, Thane West" },

  // Dosti Greater Thane / Eden — Kalher, Thane
  { titleContains: "eden",          lat: 19.2648, lng: 73.0755, area: "Kalher, Thane" },
  { titleContains: "greater thane", lat: 19.2655, lng: 73.0760, area: "Kalher, Thane" },

  // Dosti Planet North — Shilphata, Thane
  { titleContains: "planet north",  lat: 19.1942, lng: 73.0836, area: "Shilphata, Thane" },

  // Dosti Mezzo 22 — Sion East, Mumbai
  { titleContains: "mezzo",         lat: 19.0430, lng: 72.8680, area: "Sion East, Mumbai" },
];

async function main() {
  console.log('🗺️  Setting project coordinates...\n');

  const allProjects = await prisma.project.findMany({
    select: { id: true, title: true, latitude: true, longitude: true }
  });

  let updated = 0;

  for (const mapping of PROJECT_COORDS) {
    const project = allProjects.find(p =>
      p.title.toLowerCase().includes(mapping.titleContains.toLowerCase())
    );

    if (!project) {
      console.log(`⚠️  No project found matching "${mapping.titleContains}"`);
      continue;
    }

    await prisma.project.update({
      where: { id: project.id },
      data: { latitude: mapping.lat, longitude: mapping.lng }
    });

    console.log(`✅ "${project.title}" → ${mapping.lat}, ${mapping.lng} (${mapping.area})`);
    updated++;
  }

  console.log(`\n🎉 Done! Updated ${updated} projects.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
