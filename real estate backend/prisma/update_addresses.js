const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addresses = [
  {
    title: "Dosti Olive",
    address: "Dosti Olive, Dosti West County Road, Near Upcoming Balkum Naka Metro Station, Balkum, Thane West, Maharashtra 400601",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Dosti+Olive+Dosti+West+County+Road+Balkum+Thane+West+Maharashtra+400601"
  },
  {
    title: "Dosti Pine",
    address: "Dosti Pine, Dosti West County Road, Balkum, Thane West, Maharashtra 400601",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Dosti+Pine+Dosti+West+County+Road+Balkum+Thane+West+Maharashtra+400601"
  },
  {
    title: "Dosti Tulip",
    address: "Dosti Tulip, Balkum Pada, Thane West, Maharashtra 400608",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Dosti+Tulip+Balkum+Pada+Thane+West+Maharashtra+400608"
  },
  {
    title: "Dosti Nest",
    address: "Dosti Nest, Dosti West County, Balkum, Thane West, Maharashtra 400608",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Dosti+Nest+Dosti+West+County+Balkum+Thane+West+Maharashtra+400608"
  },
  {
    title: "Dosti Greater Thane",
    address: "Dosti Greater Thane, Near Upcoming Kalher Metro Station, Near S.S. Hospital, Kalher, Thane, Maharashtra 421302",
    googleMapUrl: "https://www.google.com/maps/search/?api=1&query=Dosti+Greater+Thane+Near+Upcoming+Kalher+Metro+Station+Kalher+Thane+Maharashtra+421302"
  }
];

async function main() {
  console.log("Updating project addresses...");

  for (const item of addresses) {
    const project = await prisma.project.findFirst({
      where: { title: { equals: item.title, mode: 'insensitive' } }
    });

    if (project) {
      await prisma.project.update({
        where: { id: project.id },
        data: {
          address: item.address,
          googleMapUrl: item.googleMapUrl
        }
      });
      console.log(`Updated address for: ${item.title}`);
    } else {
      console.log(`Project not found: ${item.title}`);
    }
  }

  console.log("All project addresses updated successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
