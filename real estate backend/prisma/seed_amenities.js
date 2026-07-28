const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const amenitiesData = {
  "Clubhouse & Community": [
    "Clubhouse", "Multipurpose Hall", "Party Hall", "Banquet Hall", "Community Hall", 
    "Business Centre", "Co-working Space", "Library", "Reading Room", "Indoor Lounge", 
    "Café / Restaurant", "Guest Rooms", "Reception Lobby"
  ],
  "Swimming & Water Features": [
    "Swimming Pool", "Olympic Swimming Pool", "Infinity Pool", "Kids Pool", 
    "Adventure Pool", "Pool Deck", "Pool Pavilion", "Jacuzzi", "Water Slide", 
    "Water Feature", "Fountain"
  ],
  "Sports Amenities": [
    "Gymnasium", "Fitness Centre", "Yoga Deck", "Meditation Area", "Indoor Games", 
    "Table Tennis", "Carrom", "Chess", "Billiards", "Squash Court", "Badminton Court", 
    "Basketball Court", "Volleyball Court", "Multipurpose Court", "Lawn Tennis Court", 
    "Cricket Practice Net", "Box Cricket", "Futsal Court", "Skating Rink"
  ],
  "Outdoor & Landscape": [
    "Landscaped Garden", "Central Greens", "Open Lawn", "Multipurpose Lawn", 
    "Amphitheatre", "Seating Plaza", "Senior Citizen Area", "Reflexology Path", 
    "Herbal Garden", "Gazebo", "Pergola", "Barbeque Area", "Picnic Area"
  ],
  "Kids Amenities": [
    "Children's Play Area", "Kids Play Zone", "Toddler Zone", "Sand Pit", 
    "Adventure Play Area", "Indoor Kids Room", "Creche"
  ],
  "Walking & Wellness": [
    "Jogging Track", "Walking Track", "Cycling Track", "Nature Trail", 
    "Meditation Zone", "Yoga Lawn", "Open Gym"
  ],
  "Entertainment": [
    "Mini Theatre", "AV Room", "Music Room", "Dance Studio", "Gaming Zone", 
    "Indoor Recreation Room"
  ],
  "Convenience": [
    "High Speed Elevators", "Power Backup", "Visitor Parking", "Reserved Parking", 
    "EV Charging Station", "Society Office", "Common Toilets", "Wi-Fi Enabled Areas", 
    "Intercom", "Parcel Room"
  ],
  "Security": [
    "CCTV Surveillance", "Video Door Phone", "Smart Access Control", "Keyless Door Lock", 
    "Security Cabin", "Boom Barrier", "Fire Fighting System", "Fire Alarm", 
    "Access Card Entry", "24x7 Security"
  ],
  "Apartment Features": [
    "Air Conditioned Homes", "Home Automation", "Smart Switches", "USB Charging Ports", 
    "Modular Kitchen", "Premium Kitchen Platform", "Stainless Steel Sink", "Utility Area", 
    "Balcony", "Dry Balcony", "Vitrified Flooring", "Anti-skid Bathroom Tiles", 
    "Premium Sanitary Ware", "Concealed Plumbing", "Modular Electrical Switches", 
    "TV Point", "AC Point", "Wi-Fi Point", "Telephone Point", "Mosquito Mesh", 
    "Sliding Windows", "Glass Railing", "Premium Paint"
  ],
  "Lifestyle & Special Features": [
    "Pet Park", "Temple", "Sky Garden", "Rooftop Amenities", "Viewing Deck", 
    "Organic Farming Area", "Rainwater Harvesting", "Solar Power", "STP", 
    "Waste Management", "Dance Academy", "Sports Academy"
  ]
};

async function seedAmenities() {
  console.log("Starting to seed amenities...");
  
  for (const [category, names] of Object.entries(amenitiesData)) {
    console.log(`Seeding category: ${category}`);
    
    for (const name of names) {
      await prisma.amenity.upsert({
        where: { name: name.trim() },
        update: { category },
        create: { name: name.trim(), category }
      });
    }
  }
  
  console.log("Successfully seeded all amenities!");
}

seedAmenities()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
