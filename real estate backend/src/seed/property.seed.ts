import { PrismaClient, PropertyType, PropertyStatus, PropertyTag, ConstructionStatus } from "@prisma/client";

const prisma = new PrismaClient();

// --- Curated Unsplash image pools per property type ---
const flatImages = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
  "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
];

const villaImages = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
];

const commercialImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&q=80",
  "https://images.unsplash.com/photo-1545987796-200677ee1011?w=1200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80",
  "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=1200&q=80",
];

const plotImages = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80",
  "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1200&q=80",
  "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&q=80",
  "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=1200&q=80",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&q=80",
];

function pick(arr: string[], count: number): string[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

const properties = [
  {
    title: "Luxurious 3 BHK Sea-View Apartment",
    description: "Experience the finest in coastal living with this stunning 3 BHK apartment offering breathtaking Arabian Sea views. Features premium Italian marble flooring, modular kitchen, and a wrap-around balcony.",
    type: "FLAT" as PropertyType,
    bhk: 3, locality: "Bandra West", city: "Mumbai", address: "Sea Link Road, Bandra West, Mumbai - 400050",
    carpetArea: 1450, basePrice: 45000000, status: "ACTIVE" as PropertyStatus, isFeatured: true, tag: "SEA_VIEW" as PropertyTag,
    images: flatImages,
  },
  {
    title: "Modern 2 BHK High-Rise Flat",
    description: "Beautifully designed 2 BHK apartment in a premium high-rise tower. The property offers a panoramic city skyline view with modern amenities and premium specifications throughout.",
    type: "FLAT" as PropertyType,
    bhk: 2, locality: "Lower Parel", city: "Mumbai", address: "Senapati Bapat Marg, Lower Parel, Mumbai - 400013",
    carpetArea: 950, basePrice: 28000000, status: "ACTIVE" as PropertyStatus, isFeatured: true, tag: "CITY_VIEW" as PropertyTag,
    images: flatImages,
  },
  {
    title: "Elegant 4 BHK Penthouse",
    description: "An ultra-luxurious sky penthouse with a private terrace garden, private pool, and 360-degree views of the city skyline. The pinnacle of luxury living in the heart of Mumbai.",
    type: "FLAT" as PropertyType,
    bhk: 4, locality: "Worli", city: "Mumbai", address: "Worli Sea Face, Worli, Mumbai - 400018",
    carpetArea: 3200, basePrice: 180000000, status: "ACTIVE" as PropertyStatus, isFeatured: true, tag: "SEA_VIEW" as PropertyTag,
    images: flatImages,
  },
  {
    title: "Serene 3 BHK Green Community Flat",
    description: "A nature-lover's paradise. This 3 BHK apartment is located within a sprawling green township with over 80% open spaces, lush landscaped gardens, and eco-friendly construction.",
    type: "FLAT" as PropertyType,
    bhk: 3, locality: "Powai", city: "Mumbai", address: "Hiranandani Gardens, Powai, Mumbai - 400076",
    carpetArea: 1250, basePrice: 24500000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "GREEN_VIEW" as PropertyTag,
    images: flatImages,
  },
  {
    title: "Ready-to-Move 2 BHK in Thane",
    description: "A well-planned 2 BHK apartment ready for immediate possession. Comes with all premium fittings, a modular kitchen, and is located in a gated community with 24/7 security.",
    type: "FLAT" as PropertyType,
    bhk: 2, locality: "Ghodbunder Road", city: "Thane", address: "Waghbil Naka, Ghodbunder Road, Thane - 400615",
    carpetArea: 780, basePrice: 9800000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "READY_TO_MOVE" as PropertyTag,
    images: flatImages,
  },
  {
    title: "Exclusive Waterfront Villa",
    description: "A breathtaking waterfront villa with 5 bedrooms, a private infinity pool facing the creek, and a lush private garden. Designed by an award-winning architect, this is a masterpiece of modern living.",
    type: "VILLA" as PropertyType,
    bhk: 5, locality: "Juhu", city: "Mumbai", address: "Juhu Tara Road, Juhu, Mumbai - 400049",
    carpetArea: 6500, basePrice: 350000000, status: "ACTIVE" as PropertyStatus, isFeatured: true, tag: "SEA_VIEW" as PropertyTag,
    images: villaImages,
  },
  {
    title: "Luxury 4 BHK Independent Villa",
    description: "Spread across three floors, this independent villa features a home theatre, dry kitchen with bar, climate-controlled wine cellar, and a rooftop jacuzzi with city views.",
    type: "VILLA" as PropertyType,
    bhk: 4, locality: "Versova", city: "Mumbai", address: "Yari Road, Versova, Andheri West, Mumbai - 400061",
    carpetArea: 4200, basePrice: 120000000, status: "ACTIVE" as PropertyStatus, isFeatured: true, tag: "NONE" as PropertyTag,
    images: villaImages,
  },
  {
    title: "Classic Bungalow with Heritage Charm",
    description: "A rare heritage-style bungalow with a large garden, original teak woodwork, and a dedicated staff quarter. Perfect for those who appreciate classic Mumbai architecture in a quiet, tree-lined street.",
    type: "BUNGALOW" as PropertyType,
    bhk: 5, locality: "Pali Hill", city: "Mumbai", address: "Carter Road, Bandra West, Mumbai - 400050",
    carpetArea: 5800, basePrice: 290000000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "GREEN_VIEW" as PropertyTag,
    images: villaImages,
  },
  {
    title: "Contemporary Bungalow in Quiet Lane",
    description: "A newly constructed 4-bedroom bungalow with smart home automation, solar panels, rainwater harvesting, and a beautifully landscaped garden in a serene residential colony.",
    type: "BUNGALOW" as PropertyType,
    bhk: 4, locality: "Lokhandwala", city: "Mumbai", address: "Seven Bungalows, Andheri West, Mumbai - 400053",
    carpetArea: 3800, basePrice: 85000000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "NONE" as PropertyTag,
    images: villaImages,
  },
  {
    title: "Premium Office Space in BKC",
    description: "Grade-A office space in the prime business district of Bandra Kurla Complex. Fully fitted with raised floors, centralized AC, server room, and floor-to-ceiling glass facade with parking.",
    type: "COMMERCIAL" as PropertyType,
    bhk: 1, locality: "BKC", city: "Mumbai", address: "G Block, Bandra Kurla Complex, Mumbai - 400051",
    carpetArea: 2200, basePrice: 88000000, status: "ACTIVE" as PropertyStatus, isFeatured: true, tag: "CITY_VIEW" as PropertyTag,
    images: commercialImages,
  },
  {
    title: "Retail Shop on High-Street",
    description: "A prime ground-floor retail space on one of Mumbai's most popular high-streets with extremely high footfall. Ideal for luxury brands, showrooms, banks, and fine dining restaurants.",
    type: "COMMERCIAL" as PropertyType,
    bhk: 1, locality: "Linking Road", city: "Mumbai", address: "Linking Road, Bandra West, Mumbai - 400050",
    carpetArea: 1100, basePrice: 55000000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "NONE" as PropertyTag,
    images: commercialImages,
  },
  {
    title: "IT Park Office Space",
    description: "Modern open-plan office space in a prestigious IT Park with LEED Gold certification. Features co-working zones, dedicated meeting rooms, a cafeteria, and high-speed fiber connectivity.",
    type: "COMMERCIAL" as PropertyType,
    bhk: 1, locality: "Malad West", city: "Mumbai", address: "Mindspace, Malad West, Mumbai - 400064",
    carpetArea: 3500, basePrice: 75000000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "NONE" as PropertyTag,
    images: commercialImages,
  },
  {
    title: "Premium Residential Plot - Alibaug",
    description: "A stunning plot of land facing lush green hills near the coast. RERA approved, with clear titles and excellent road connectivity. Ideal for building a weekend home or luxury farmhouse.",
    type: "PLOT" as PropertyType,
    bhk: 1, locality: "Alibaug", city: "Alibaug", address: "Kashid Road, Alibaug, Raigad - 402201",
    carpetArea: 5000, basePrice: 15000000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "GREEN_VIEW" as PropertyTag,
    images: plotImages,
  },
  {
    title: "RERA Approved Plot in Thane",
    description: "A prime residential plot in a fast-developing township near Thane. Gated community, 24-hour security, wide internal roads, and all civic amenities in place. Ready for immediate construction.",
    type: "PLOT" as PropertyType,
    bhk: 1, locality: "Kalyan West", city: "Thane", address: "Tilaknagar Colony, Kalyan West, Thane - 421301",
    carpetArea: 2400, basePrice: 6500000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "NONE" as PropertyTag,
    images: plotImages,
  },
  {
    title: "Under-Construction 3 BHK in Navi Mumbai",
    description: "Be the first to own this premium 3 BHK in an upcoming luxury project by a top developer. Pre-launch pricing, flexible payment plan, and possession expected by December 2026.",
    type: "FLAT" as PropertyType,
    bhk: 3, locality: "Kharghar", city: "Navi Mumbai", address: "Sector 20, Kharghar, Navi Mumbai - 410210",
    carpetArea: 1180, basePrice: 18500000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "UNDER_CONSTRUCTION" as PropertyTag,
    images: flatImages,
  },
  {
    title: "Spacious 1 BHK Starter Home",
    description: "An affordable and thoughtfully designed 1 BHK apartment perfect for young professionals and first-time buyers. Located close to the metro station with excellent connectivity to BKC and Lower Parel.",
    type: "FLAT" as PropertyType,
    bhk: 1, locality: "Goregaon East", city: "Mumbai", address: "Film City Road, Goregaon East, Mumbai - 400063",
    carpetArea: 510, basePrice: 9200000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "READY_TO_MOVE" as PropertyTag,
    images: flatImages,
  },
  {
    title: "Row House in Gated Township",
    description: "A gorgeous 3-bedroom row house with a private front yard, back garden, and a dedicated parking space. Part of a premium gated township with a clubhouse, pool, and jogging track.",
    type: "ROW_HOUSE" as PropertyType,
    bhk: 3, locality: "Panvel", city: "Navi Mumbai", address: "Roadpali, Panvel, Navi Mumbai - 410206",
    carpetArea: 1900, basePrice: 16500000, status: "ACTIVE" as PropertyStatus, isFeatured: false, tag: "GREEN_VIEW" as PropertyTag,
    images: villaImages,
  },
];

async function seedProperties() {
  console.log("🏠 Seeding properties...\n");

  // Fetch all amenities to randomly assign them
  const amenities = await prisma.amenity.findMany();
  if (amenities.length === 0) {
    console.error("❌ No amenities found! Please run the amenity seed first.");
    return;
  }

  let count = 0;
  for (const prop of properties) {
    const { images, tag, ...data } = prop;

    let dbTag: PropertyTag = "NONE";
    let dbStatus: ConstructionStatus = "NONE";

    if (tag === "READY_TO_MOVE") {
      dbStatus = "READY_TO_MOVE";
    } else if (tag === "UNDER_CONSTRUCTION") {
      dbStatus = "UNDER_CONSTRUCTION";
    } else {
      dbTag = tag as PropertyTag;
      // Randomly assign a construction status for properties that don't have one
      const statuses: ConstructionStatus[] = ["READY_TO_MOVE", "UNDER_CONSTRUCTION", "NONE"];
      dbStatus = statuses[Math.floor(Math.random() * statuses.length)];
    }

    // Pick 5–8 random images for each property
    const imageCount = Math.floor(Math.random() * 4) + 5; // 5 to 8
    const selectedImages = pick(images, imageCount);

    // Randomly assign 4–8 amenities per property
    const amenityCount = Math.floor(Math.random() * 5) + 4;
    const selectedAmenities = pick(amenities.map(a => a.id), amenityCount);

    await prisma.property.create({
      data: {
        ...data,
        tag: dbTag,
        constructionStatus: dbStatus,
        basePrice: data.basePrice,
        priceType: "SALE",
        images: {
          create: selectedImages.map((url, order) => ({ url, order })),
        },
        amenities: {
          create: selectedAmenities.map(amenityId => ({
            amenity: { connect: { id: amenityId } },
          })),
        },
      },
    });

    console.log(`  ✅ [${++count}/${properties.length}] Added: "${prop.title}" (${selectedImages.length} images, ${selectedAmenities.length} amenities, tag: ${dbTag}, construction: ${dbStatus})`);
  }

  console.log(`\n🎉 Done! Seeded ${count} properties.`);
}

seedProperties()
  .catch(e => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
