const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const projectAmenitiesMap = {
  "Dosti 604": {
    "General": [
      "Arrival deck",
      "Entry / Exit",
      "Driveway",
      "Drop-off zone",
      "Sculpture",
      "Skating rink",
      "Cricket pitch",
      "Seating deck",
      "Stepped seating",
      "Security cabin",
      "Miyawaki area",
      "Entry to podium",
      "Pathway",
      "The Leisure Deck",
      "Reflexology path",
      "Pool deck",
      "Kids' play area",
      "Reflection pool with sun loungers",
      "Tot lot",
      "Rock climbing",
      "Tree house",
      "Lap pool",
      "Infinity edge",
      "Kids' pool",
      "Jacuzzi",
      "Open shower",
      "Party deck",
      "Party lawn",
      "Bar counter",
      "Alfresco deck",
      "Planter",
      "Health club",
      "Fitness centre",
      "Indoor games",
      "Business centre",
      "Conference rooms",
      "Party hall",
      "Kids' game area",
      "Creche area",
      "Banquet"
    ]
  }
};

async function main() {
  console.log("Starting to link project amenities...");

  for (const [projectName, categories] of Object.entries(projectAmenitiesMap)) {
    console.log(`\nProcessing Project: ${projectName}`);

    // Find or create project
    let project = await prisma.project.findFirst({
      where: { title: { equals: projectName, mode: 'insensitive' } }
    });

    if (!project) {
      console.log(`Project '${projectName}' not found! Creating it...`);
      const township = await prisma.township.findFirst();
      project = await prisma.project.create({
        data: {
          title: projectName,
          slug: projectName.toLowerCase().replace(/ /g, '-'),
          townshipId: township ? township.id : null,
          description: `Premium residences at ${projectName}`
        }
      });
    }

    // Clear old amenities for this project
    await prisma.projectAmenity.deleteMany({
      where: { projectId: project.id }
    });

    // Add amenities
    for (const [category, amenitiesList] of Object.entries(categories)) {
      for (const amenityName of amenitiesList) {
        // Find or create amenity
        let amenity = await prisma.amenity.findFirst({
          where: { name: { equals: amenityName.trim(), mode: 'insensitive' } }
        });

        if (!amenity) {
          amenity = await prisma.amenity.create({
            data: { name: amenityName.trim(), category }
          });
        }

        // Link to project
        await prisma.projectAmenity.create({
          data: {
            projectId: project.id,
            amenityId: amenity.id
          }
        });
      }
    }
    console.log(`Successfully mapped ${Object.values(categories).flat().length} amenities for ${projectName}`);
  }

  console.log("\nAll project amenities linked successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
