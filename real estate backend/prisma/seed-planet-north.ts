/**
 * Seed script for Dosti Planet North
 *
 * Creates ONE project "Dosti Planet North" with 4 properties:
 *   - Dosti Amber   — 1 BHK  (1 bhk images + no floor plan in 1bhk folder for Amber)
 *   - Dosti Amber   — 2 BHK  (2 bhk images + amber floor.png)
 *   - Dosti Sapphire — 1 BHK (1 bhk images + sapphire floor.png from 1bhk folder)
 *   - Dosti Sapphire — 2 BHK (2 bhk images + sapphire floor.png from 2bhk folder)
 *
 * Run with:  npm run seed:planet-north
 *
 * ⚠️  Update the PRICE_PER_SQFT and CARPET_AREA_* constants with actual figures.
 * This script is IDEMPOTENT — safe to re-run after corrections.
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────────────────────
// 💰 Pricing & Sizing — UPDATE THESE with actual figures
// ─────────────────────────────────────────────────────────────────────────────
const PRICE_PER_SQFT      = 18000; // ← Rs per sq.ft (placeholder)
const CARPET_1BHK_MIN     = 450;   // ← 1 BHK min sq.ft (placeholder)
const CARPET_1BHK_MAX     = 520;   // ← 1 BHK max sq.ft (placeholder)
const CARPET_2BHK_MIN     = 700;   // ← 2 BHK min sq.ft (placeholder)
const CARPET_2BHK_MAX     = 760;   // ← 2 BHK max sq.ft (placeholder)

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const url = (...segments: string[]): string =>
  `${BASE_URL}/uploads/${segments.map(encodeURIComponent).join("/")}`;

// ─────────────────────────────────────────────────────────────────────────────
// Amenities
// ─────────────────────────────────────────────────────────────────────────────
const AMENITIES_DATA = [
  { name: "Badminton Court",       category: "Outdoor" },
  { name: "Basketball",            category: "Outdoor" },
  { name: "Box Cricket",           category: "Outdoor" },
  { name: "Hopscotch - Play Area", category: "Outdoor" },
  { name: "Toddlers Play Area",    category: "Outdoor" },
  { name: "Reflexology Path",      category: "Outdoor" },
  { name: "Kids' Play Area",       category: "Outdoor" },
  { name: "Skating Wall",          category: "Outdoor" },
  { name: "Resting Plaza",         category: "Outdoor" },
  { name: "Outdoor Gym",           category: "Outdoor" },
  { name: "Lawn Area",             category: "Outdoor" },
  { name: "Jogging Path",          category: "Outdoor" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Media
// ─────────────────────────────────────────────────────────────────────────────
const D1 = "dosti real planet";

// 1 BHK images — only the 8 files that are UNIQUE to the '1 bhk' folder.
// (Files like LIVING ROOM .jpg, MASTER BED.jpg, KIDS BEDROOM .jpg, KITCHEN1.jpg
//  exist in both folders with identical byte sizes — those belong to 2BHK.)
const IMAGES_1BHK = [
  url(D1, "1 bhk", "Living Room.jpg"),
  url(D1, "1 bhk", "Living Room 1.jpg"),
  url(D1, "1 bhk", "Master Bedroom.jpg"),
  url(D1, "1 bhk", "Master Bedroom 1.jpg"),
  url(D1, "1 bhk", "Kitchen.jpg"),
  url(D1, "1 bhk", "Common Bathroom.jpg"),
  url(D1, "1 bhk", "Master Bathroom.jpg"),
  url(D1, "1 bhk", "Dining Area.jpg"),
];

// 2 BHK images (shared by Amber 2BHK and Sapphire 2BHK)
const IMAGES_2BHK = [
  url(D1, "2bhk", "LIVING ROOM .jpg"),
  url(D1, "2bhk", "LIVING ROOM 1.jpg"),
  url(D1, "2bhk", "LIVING ROOM 3.jpg"),
  url(D1, "2bhk", "MASTER BED.jpg"),
  url(D1, "2bhk", "MASTER BED 1.jpg"),
  url(D1, "2bhk", "MASTER BATHROOM.jpg"),
  url(D1, "2bhk", "KIDS BEDROOM .jpg"),
  url(D1, "2bhk", "KIDS BEDROOM 1.jpg"),
  url(D1, "2bhk", "KITCHEN.jpg"),
  url(D1, "2bhk", "KITCHEN1.jpg"),
  url(D1, "2bhk", "COMMON BATHROOM.jpg"),
];

// Video URLs
const VIDEO_SAPPHIRE_1BHK = url(D1, "1 bhk", "Dosti Planet 1bhk.mp4");
const VIDEO_AMBER_2BHK    = url(D1, "2bhk", "2bhk amber.mp4");
const VIDEO_SAPPHIRE_2BHK = url(D1, "2bhk", "2 bhk sapphire.mp4");

// Floor plans
const FP_SAPPHIRE_1BHK = url(D1, "1 bhk", "sapphire floor.png");
const FP_AMBER_2BHK    = url(D1, "2bhk", "amber floor.png");
const FP_SAPPHIRE_2BHK = url(D1, "2bhk", "sapphire floor.png");

// ─────────────────────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────────────────────
const toImages = (urls: string[]) =>
  urls.map((u, i) => ({ url: u, order: i }));

// ─────────────────────────────────────────────────────────────────────────────
// Seed
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀  Starting Dosti Planet North seed...\n");

  // ── 1. Upsert amenities ──────────────────────────────────────────────────
  console.log(`📋  Upserting ${AMENITIES_DATA.length} amenities...`);
  for (const a of AMENITIES_DATA) {
    await prisma.amenity.upsert({
      where: { name: a.name },
      update: { category: a.category },
      create: a,
    });
  }
  const amenities = await prisma.amenity.findMany({
    where: { name: { in: AMENITIES_DATA.map((a) => a.name) } },
  });
  console.log(`    ✅  ${amenities.length} amenities ready.\n`);

  // ── 2. Delete old Dosti Amber & Sapphire standalone projects (cleanup) ──
  for (const name of ["Dosti Amber", "Dosti Sapphire", "Dosti Planet North"]) {
    const existing = await prisma.project.findFirst({ where: { name } });
    if (existing) {
      console.log(`🗑️   Removing existing "${name}"...`);
      await prisma.property.deleteMany({ where: { projectId: existing.id } });
      await prisma.project.delete({ where: { id: existing.id } });
      console.log(`    ✅  Removed.\n`);
    }
  }

  // ── 3. Create ONE project: Dosti Planet North ────────────────────────────
  console.log("🏢  Creating Project: Dosti Planet North...");
  const project = await prisma.project.create({
    data: {
      name: "Dosti Planet North",
      description:
        "Dosti Planet North is a landmark residential development in Thane, " +
        "comprising two premium towers — Dosti Amber and Dosti Sapphire. " +
        "Offering thoughtfully designed 1 BHK and 2 BHK ready-to-move apartments, " +
        "the project features an impressive array of outdoor amenities including " +
        "a badminton court, basketball court, box cricket, skating wall, outdoor gym, " +
        "reflexology path, jogging track, and more.",
      locality: "Thane",
      city:     "Thane",
      address:  "Dosti Planet North, Thane",
      images: {
        create: toImages([
          url(D1, "2bhk", "LIVING ROOM 1.jpg"),
          url(D1, "2bhk", "MASTER BED.jpg"),
          url(D1, "1 bhk", "Living Room.jpg"),
          url(D1, "1 bhk", "Master Bedroom.jpg"),
        ]),
      },
      amenities: {
        create: amenities.map((a) => ({ amenityId: a.id })),
      },
    },
  });
  console.log(`    ✅  Project created — ID: ${project.id}\n`);

  // ── 4. Dosti Amber — 2 BHK ───────────────────────────────────────────────
  console.log("🏠  Creating: Dosti Amber — 2 BHK...");
  const amber2 = await prisma.property.create({
    data: {
      title:              "Dosti Amber — 2 BHK",
      description:        "Spacious 2 BHK apartment in Dosti Amber tower at Dosti Planet North, Thane. Features a master bedroom, kids bedroom, modern kitchen, and high-quality finishes. Ready to move in.",
      type:               "FLAT",
      priceType:          "SALE",
      bhk:                [2],
      carpetArea:         `${CARPET_2BHK_MIN} - ${CARPET_2BHK_MAX} Sq. Ft.`,
      locality:           "Thane",
      city:               "Thane",
      address:            "Dosti Planet North — Amber Tower, Thane",
      projectId:          project.id,
      constructionStatus: "READY_TO_MOVE",
      tag:                "CITY_VIEW",
      basePrice:          CARPET_2BHK_MIN * PRICE_PER_SQFT,
      videoUrl:    VIDEO_AMBER_2BHK,
      images:      { create: toImages(IMAGES_2BHK) },
      units: {
        create: [
          { bhk: 2, carpetArea: CARPET_2BHK_MIN, pricePerSqft: PRICE_PER_SQFT, totalPrice: CARPET_2BHK_MIN * PRICE_PER_SQFT },
          { bhk: 2, carpetArea: CARPET_2BHK_MAX, pricePerSqft: PRICE_PER_SQFT, totalPrice: CARPET_2BHK_MAX * PRICE_PER_SQFT },
        ],
      },
      floorPlans:  { create: [{ url: FP_AMBER_2BHK,    label: "Dosti Amber — 2 BHK Floor Plan",    order: 0 }] },
      amenities:   { create: amenities.map((a) => ({ amenityId: a.id })) },
    },
  });
  console.log(`    ✅  ID: ${amber2.id}  (₹${(CARPET_2BHK_MIN * PRICE_PER_SQFT / 10000000).toFixed(2)}Cr – ₹${(CARPET_2BHK_MAX * PRICE_PER_SQFT / 10000000).toFixed(2)}Cr)`);

  // ── 6. Dosti Sapphire — 1 BHK ────────────────────────────────────────────
  console.log("🏠  Creating: Dosti Sapphire — 1 BHK...");
  const sapphire1 = await prisma.property.create({
    data: {
      title:              "Dosti Sapphire — 1 BHK",
      description:        "Smartly designed 1 BHK apartment in Dosti Sapphire tower at Dosti Planet North, Thane. Features a master bedroom, modern kitchen, dining area, and premium finishes. Ready to move in.",
      type:               "FLAT",
      priceType:          "SALE",
      bhk:                [1],
      carpetArea:         `${CARPET_1BHK_MIN} - ${CARPET_1BHK_MAX} Sq. Ft.`,
      locality:           "Thane",
      city:               "Thane",
      address:            "Dosti Planet North — Sapphire Tower, Thane",
      projectId:          project.id,
      constructionStatus: "READY_TO_MOVE",
      tag:                "CITY_VIEW",
      basePrice:          CARPET_1BHK_MIN * PRICE_PER_SQFT,
      videoUrl:    VIDEO_SAPPHIRE_1BHK,
      images:      { create: toImages(IMAGES_1BHK) },
      units: {
        create: [
          { bhk: 1, carpetArea: CARPET_1BHK_MIN, pricePerSqft: PRICE_PER_SQFT, totalPrice: CARPET_1BHK_MIN * PRICE_PER_SQFT },
          { bhk: 1, carpetArea: CARPET_1BHK_MAX, pricePerSqft: PRICE_PER_SQFT, totalPrice: CARPET_1BHK_MAX * PRICE_PER_SQFT },
        ],
      },
      floorPlans:  { create: [{ url: FP_SAPPHIRE_1BHK, label: "Dosti Sapphire — 1 BHK Floor Plan", order: 0 }] },
      amenities:   { create: amenities.map((a) => ({ amenityId: a.id })) },
    },
  });
  console.log(`    ✅  ID: ${sapphire1.id}  (₹${(CARPET_1BHK_MIN * PRICE_PER_SQFT / 100000).toFixed(0)}L – ₹${(CARPET_1BHK_MAX * PRICE_PER_SQFT / 100000).toFixed(0)}L)`);

  // ── 7. Dosti Sapphire — 2 BHK ────────────────────────────────────────────
  console.log("🏠  Creating: Dosti Sapphire — 2 BHK...");
  const sapphire2 = await prisma.property.create({
    data: {
      title:              "Dosti Sapphire — 2 BHK",
      description:        "Spacious 2 BHK apartment in Dosti Sapphire tower at Dosti Planet North, Thane. Features a master bedroom, kids bedroom, modern kitchen, and high-quality finishes. Ready to move in.",
      type:               "FLAT",
      priceType:          "SALE",
      bhk:                [2],
      carpetArea:         `${CARPET_2BHK_MIN} - ${CARPET_2BHK_MAX} Sq. Ft.`,
      locality:           "Thane",
      city:               "Thane",
      address:            "Dosti Planet North — Sapphire Tower, Thane",
      projectId:          project.id,
      constructionStatus: "READY_TO_MOVE",
      tag:                "CITY_VIEW",
      basePrice:          CARPET_2BHK_MIN * PRICE_PER_SQFT,
      videoUrl:    VIDEO_SAPPHIRE_2BHK,
      images:      { create: toImages(IMAGES_2BHK) },
      units: {
        create: [
          { bhk: 2, carpetArea: CARPET_2BHK_MIN, pricePerSqft: PRICE_PER_SQFT, totalPrice: CARPET_2BHK_MIN * PRICE_PER_SQFT },
          { bhk: 2, carpetArea: CARPET_2BHK_MAX, pricePerSqft: PRICE_PER_SQFT, totalPrice: CARPET_2BHK_MAX * PRICE_PER_SQFT },
        ],
      },
      floorPlans:  { create: [{ url: FP_SAPPHIRE_2BHK, label: "Dosti Sapphire — 2 BHK Floor Plan", order: 0 }] },
      amenities:   { create: amenities.map((a) => ({ amenityId: a.id })) },
    },
  });
  console.log(`    ✅  ID: ${sapphire2.id}  (₹${(CARPET_2BHK_MIN * PRICE_PER_SQFT / 10000000).toFixed(2)}Cr – ₹${(CARPET_2BHK_MAX * PRICE_PER_SQFT / 10000000).toFixed(2)}Cr)\n`);

  // ── Done ─────────────────────────────────────────────────────────────────
  console.log("🎉  Seed completed successfully!");
  console.log("══════════════════════════════════════════════════════");
  console.log(`   Project: Dosti Planet North  → ${project.id}`);
  console.log(`   ├─ Amber   2 BHK             → ${amber2.id}`);
  console.log(`   ├─ Sapphire 1 BHK            → ${sapphire1.id}`);
  console.log(`   └─ Sapphire 2 BHK            → ${sapphire2.id}`);
  console.log("══════════════════════════════════════════════════════");
  console.log(`\n👉  Visit: /projects/${project.id}`);
}

main()
  .catch((e) => { console.error("❌  Seed error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
