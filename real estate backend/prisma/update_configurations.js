const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = [
  {
    projectName: "Dosti Olive",
    configs: [
      { bhk: 1, carpetArea: 570, label: "1 BHK + Study (570 sq.ft)", price: 7500000 },
      { bhk: 2, carpetArea: 634, label: "2 BHK (634 sq.ft)", price: 9500000 },
      { bhk: 2, carpetArea: 704, label: "2 BHK (704 sq.ft)", price: 10500000 },
      { bhk: 2, carpetArea: 726, label: "2 BHK (726 sq.ft)", price: 11000000 },
      { bhk: 3, carpetArea: 912, label: "3 BHK (912 sq.ft)", price: 14000000 },
      { bhk: 3, carpetArea: 985, label: "3 BHK (985 sq.ft)", price: 15500000 }
    ]
  },
  {
    projectName: "Dosti Tulip",
    configs: [
      { bhk: 2, carpetArea: 559, label: "2 BHK (559 sq.ft)", price: 8500000 },
      { bhk: 2, carpetArea: 570, label: "2 BHK (570 sq.ft)", price: 8800000 },
      { bhk: 2, carpetArea: 578, label: "2 BHK (578 sq.ft)", price: 9000000 },
      { bhk: 2, carpetArea: 584, label: "2 BHK (584 sq.ft)", price: 9200000 },
      { bhk: 2, carpetArea: 587, label: "2 BHK (587 sq.ft)", price: 9300000 },
      { bhk: 3, carpetArea: 797, label: "3 BHK (797 sq.ft)", price: 12500000 }
    ]
  },
  {
    projectName: "Dosti Nest",
    configs: [
      { bhk: 1, carpetArea: 322, label: "1 BHK (322 sq.ft)", price: 5500000 }
    ]
  }
];

async function main() {
  console.log("Updating configurations...");

  for (const group of updates) {
    const project = await prisma.project.findFirst({
      where: { title: { equals: group.projectName, mode: 'insensitive' } },
      include: { configurations: true, media: true }
    });

    if (!project) {
      console.log(`Project not found: ${group.projectName}`);
      continue;
    }

    console.log(`\nProcessing ${project.title}...`);

    // For each target configuration variant
    for (const cData of group.configs) {
      // Find if config with exact carpetArea exists
      let config = await prisma.projectConfiguration.findFirst({
        where: { projectId: project.id, bhk: cData.bhk, carpetArea: cData.carpetArea }
      });

      if (!config) {
        // Find generic config for this bhk to update if available and not yet updated
        const generic = project.configurations.find(c => c.bhk === cData.bhk && c.carpetArea === 500);
        if (generic) {
          config = await prisma.projectConfiguration.update({
            where: { id: generic.id },
            data: {
              carpetArea: cData.carpetArea,
              label: cData.label,
              totalPrice: cData.price
            }
          });
          // Update in-memory reference
          generic.carpetArea = cData.carpetArea;
          console.log(`Updated generic ${cData.bhk} BHK to ${cData.label}`);
        } else {
          config = await prisma.projectConfiguration.create({
            data: {
              projectId: project.id,
              bhk: cData.bhk,
              carpetArea: cData.carpetArea,
              label: cData.label,
              totalPrice: cData.price
            }
          });
          console.log(`Created configuration: ${cData.label}`);
        }
      } else {
        await prisma.projectConfiguration.update({
          where: { id: config.id },
          data: {
            label: cData.label,
            totalPrice: cData.price
          }
        });
        console.log(`Updated configuration: ${cData.label}`);
      }

      // Re-assign floor plans if any were attached to this bhk
      const bhkFloorPlan = project.media.find(m => m.type === 'FLOOR_PLAN' && m.configurationId);
      if (bhkFloorPlan && !bhkFloorPlan.configurationId) {
        await prisma.projectMedia.update({
          where: { id: bhkFloorPlan.id },
          data: { configurationId: config.id }
        });
      }
    }
  }

  console.log("\nAll project configurations updated successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
