import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultAmenities = [
  "Swimming Pool",
  "Gymnasium",
  "24x7 Security",
  "Power Backup",
  "Car Parking",
  "Club House",
  "Kids Play Area",
  "Jogging Track",
  "Landscaped Gardens",
  "CCTV Surveillance",
  "Elevator",
  "Fire Fighting Systems",
  "Intercom",
  "Wi-Fi Connectivity",
  "Vastu Compliant"
];

async function seedAmenities() {
  console.log("Seeding amenities...");
  
  let addedCount = 0;
  for (const name of defaultAmenities) {
    const existing = await prisma.amenity.findUnique({
      where: { name }
    });
    
    if (!existing) {
      await prisma.amenity.create({
        data: { name }
      });
      console.log(`Added amenity: ${name}`);
      addedCount++;
    }
  }
  
  console.log(`Finished seeding! Added ${addedCount} new amenities.`);
}

seedAmenities()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
