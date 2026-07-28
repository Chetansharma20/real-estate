import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const password = process.env.ADMIN_PASSWORD || '12345';
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        isVerified: true
      }
    });
    console.log(`Admin user created: ${adminEmail} / ${password}`);
  } else {
    const password = process.env.ADMIN_PASSWORD || '12345';
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: adminEmail },
      data: { password: hashedPassword }
    });
    console.log(`Admin user password updated/synced for: ${adminEmail}`);
  }

  console.log("Starting seed for Dosti Eden...");

  // Clean up existing projects
  await prisma.project.deleteMany();
  await prisma.township.deleteMany();

  // Create Amenities
  const amenitiesData = [
    // Outdoor
    { name: "Swimming pool with deck", category: "Outdoor" },
    { name: "Kids' pool", category: "Outdoor" },
    { name: "Jacuzzi", category: "Outdoor" },
    { name: "Pickleball court", category: "Outdoor" },
    { name: "Multipurpose court", category: "Outdoor" },
    { name: "Zen garden", category: "Outdoor" },
    { name: "Reflexology path", category: "Outdoor" },
    { name: "Kids' play area", category: "Outdoor" },
    { name: "Tree house", category: "Outdoor" },
    { name: "Sand pit", category: "Outdoor" },
    { name: "Climbing wall", category: "Outdoor" },
    { name: "BBQ area", category: "Outdoor" },
    // Indoor
    { name: "Fitness centre/gymnasium", category: "Indoor" },
    { name: "Spa", category: "Indoor" },
    { name: "Steam room", category: "Indoor" },
    { name: "Crèche", category: "Indoor" },
    { name: "Multipurpose hall", category: "Indoor" },
    { name: "Indoor games", category: "Indoor" },
    // Green Features
    { name: "Rainwater harvesting", category: "Green Features" },
    { name: "Sewage treatment plant", category: "Green Features" },
    { name: "Solar panels for hot water", category: "Green Features" },
    { name: "Energy-efficient lighting", category: "Green Features" },
    { name: "Low VOC paints", category: "Green Features" },
  ];

  for (const amenity of amenitiesData) {
    await prisma.amenity.upsert({
      where: { name: amenity.name },
      update: { category: amenity.category },
      create: amenity,
    });
  }

  // Fetch created amenities to link them
  const allAmenities = await prisma.amenity.findMany({
    where: { name: { in: amenitiesData.map(a => a.name) } }
  });

  // 1. Create Township
  const township = await prisma.township.create({
    data: {
      name: "Dosti West County",
      slug: "dosti-west-county",
      description: "A premium residential township in Thane.",
      locality: "Thane",
      city: "Mumbai",
      address: "Phase 2, Off Ghodbunder Road, Near Orchids International School, Brahmand Road, Thane (West) - 400607"
    }
  });

  // 2. Create the Project "Dosti Eden"
  const project = await prisma.project.create({
    data: {
      townshipId: township.id,
      title: "Dosti Eden",
      slug: "dosti-eden",
      description: "Dosti Eden offers beautifully designed modern apartments with top-tier amenities, green spaces, and a peaceful environment.",
      propertyType: "FLAT",
      constructionStatus: "UNDER_CONSTRUCTION",
      propertyView: "GARDEN",
      featured: true,
      status: "ACTIVE",
      amenities: {
        create: allAmenities.map((a) => ({
          amenityId: a.id
        }))
      },
      media: {
        create: [
          { url: "http://localhost:5000/uploads/2%20bhk/Living%20Room.jpg", sortOrder: 0, type: "IMAGE", isCover: true },
          { url: "http://localhost:5000/uploads/3%20bhk/Living%20Room.jpg", sortOrder: 1, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/2%20bhk/Living%20Room%20(2).jpg", sortOrder: 2, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/2%20bhk/Living%20Room%20(3).jpg", sortOrder: 3, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/2%20bhk/Common%20Bedroom.jpg", sortOrder: 4, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/2%20bhk/Master%20Bedroom.jpg", sortOrder: 5, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/2%20bhk/Master%20Bedroom%20(2).jpg", sortOrder: 6, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/2%20bhk/Kitchen.jpg", sortOrder: 7, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/2%20bhk/Dining%20Area.jpg", sortOrder: 8, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/2%20bhk/Common%20Toilet.jpg", sortOrder: 9, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/2%20bhk/Master%20Toilet.jpg", sortOrder: 10, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Living%20Room%20(2).jpg", sortOrder: 11, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Living%20Room%20(3).jpg", sortOrder: 12, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Dining%20Area.jpg", sortOrder: 13, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Dining%20Area%20(2).jpg", sortOrder: 14, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Master%20Bedroom.jpg", sortOrder: 15, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Master%20Bedroom%20(2).jpg", sortOrder: 16, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Master%20Bedroom%20(3).jpg", sortOrder: 17, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Kids%20Bedroom.jpg", sortOrder: 18, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Kids%20Bedroom%20(2).jpg", sortOrder: 19, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Kids%20Bedroom%20(3).jpg", sortOrder: 20, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Common%20Bedroom.jpg", sortOrder: 21, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Common%20Bedroom%20(2).jpg", sortOrder: 22, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Kitchen.jpg", sortOrder: 23, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Balcony.jpg", sortOrder: 24, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Master%20Bathroom.jpg", sortOrder: 25, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Kids%20Bathroom.jpg", sortOrder: 26, type: "IMAGE", isCover: false },
          { url: "http://localhost:5000/uploads/3%20bhk/Common%20Bathroom.jpg", sortOrder: 27, type: "IMAGE", isCover: false }
        ]
      }
    }
  });

  // Configurations
  const config2BHK = await prisma.projectConfiguration.create({
    data: {
      projectId: project.id,
      bhk: 2,
      carpetArea: 680,
      pricePerSqft: 18382,
      totalPrice: 12500000,
      label: "Premium 2 BHK",
      availableUnits: 10,
      isAvailable: true
    }
  });

  const config3BHK = await prisma.projectConfiguration.create({
    data: {
      projectId: project.id,
      bhk: 3,
      carpetArea: 950,
      pricePerSqft: 19473,
      totalPrice: 18500000,
      label: "Luxurious 3 BHK",
      availableUnits: 5,
      isAvailable: true
    }
  });

  // Attach Floor Plans to Configurations
  await prisma.projectMedia.create({
    data: {
      projectId: project.id,
      configurationId: config2BHK.id,
      url: "http://localhost:5000/uploads/2%20bhk/floor_plan.png",
      type: "FLOOR_PLAN",
      sortOrder: 0
    }
  });

  await prisma.projectMedia.create({
    data: {
      projectId: project.id,
      configurationId: config3BHK.id,
      url: "http://localhost:5000/uploads/3%20bhk/floor_plan.png",
      type: "FLOOR_PLAN",
      sortOrder: 0
    }
  });

  console.log(`Created Project: ${project.title} (ID: ${project.id}) with 2 Configurations.`);
  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
