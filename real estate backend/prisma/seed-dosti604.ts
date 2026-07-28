/**
 * Seed script for Dosti 604 project
 *
 * Run with:  npm run seed:dosti604
 *
 * ⚠️  IMPORTANT: Update PRICE_PER_SQFT_2BHK and PRICE_PER_SQFT_3BHK below
 *     before running this script if you have the actual prices.
 *     The values below are reasonable placeholders for Thane / Wagle Estate.
 *
 * This script is IDEMPOTENT — it will delete and recreate the Dosti 604
 * project on every run so it is safe to re-run after corrections.
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────────────────────
// 💰 Pricing — UPDATE THESE if you have actual figures
// ─────────────────────────────────────────────────────────────────────────────
const PRICE_PER_SQFT_2BHK = 18000; // ← Rs per sq.ft for 2 BHK (placeholder)
const PRICE_PER_SQFT_3BHK = 18000; // ← Rs per sq.ft for 3 BHK (placeholder)

// ─────────────────────────────────────────────────────────────────────────────
// Base URL for serving static files from the /uploads directory
// ─────────────────────────────────────────────────────────────────────────────
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

/**
 * Build a fully-qualified URL for a file inside the uploads/ directory.
 * Each segment is URL-encoded so filenames/folders with spaces work correctly.
 */
const url = (...segments: string[]): string => {
  const encodedPath = segments.map((s) => encodeURIComponent(s)).join("/");
  return `${BASE_URL}/uploads/${encodedPath}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// Amenities — 55 unique amenities across 4 zones
// ─────────────────────────────────────────────────────────────────────────────
const AMENITIES_DATA = [
  // ── Arrival & Ground Level ─────────────────────────────────────────────────
  { name: "Arrival Deck",       category: "Arrival & Ground" },
  { name: "Entry / Exit",       category: "Arrival & Ground" },
  { name: "Driveway",           category: "Arrival & Ground" },
  { name: "Drop-off Zone",      category: "Arrival & Ground" },
  { name: "Skating Rink",       category: "Arrival & Ground" },
  { name: "Cricket Pitch",      category: "Arrival & Ground" },
  { name: "Security Cabin",     category: "Arrival & Ground" },
  { name: "Miyawaki Area",      category: "Arrival & Ground" },

  // ── Leisure Deck (Podium) ──────────────────────────────────────────────────
  { name: "Entry to Podium",                   category: "Leisure Deck" },
  { name: "Pool Deck",                          category: "Leisure Deck" },
  { name: "Reflection Pool with Sun Loungers",  category: "Leisure Deck" },
  { name: "Lap Pool",                           category: "Leisure Deck" },
  { name: "Infinity Edge",                      category: "Leisure Deck" },
  { name: "Kids' Pool",                         category: "Leisure Deck" },
  { name: "Jacuzzi",                            category: "Leisure Deck" },
  { name: "Open Shower",                        category: "Leisure Deck" },
  { name: "Party Deck",                         category: "Leisure Deck" },
  { name: "Party Lawn",                         category: "Leisure Deck" },
  { name: "Alfresco Deck",                      category: "Leisure Deck" },
  { name: "Reflexology Path",                   category: "Leisure Deck" },
  { name: "Kids' Play Area",                    category: "Leisure Deck" },
  { name: "Tot Lot",                            category: "Leisure Deck" },
  { name: "Rock Climbing",                      category: "Leisure Deck" },
  { name: "Tree House",                         category: "Leisure Deck" },
  { name: "Health Club",                        category: "Leisure Deck" },
  { name: "Fitness Centre",                     category: "Leisure Deck" },
  { name: "Indoor Games",                       category: "Leisure Deck" },
  { name: "Business Centre",                    category: "Leisure Deck" },
  { name: "Conference Rooms",                   category: "Leisure Deck" },
  { name: "Party Hall",                         category: "Leisure Deck" },
  { name: "Kids' Game Area",                    category: "Leisure Deck" },
  { name: "Creche Area",                        category: "Leisure Deck" },
  { name: "Banquet",                            category: "Leisure Deck" },

  // ── Sky Deck ───────────────────────────────────────────────────────────────
  { name: "Entry to Landscape",                  category: "Sky Deck" },
  { name: "Star Gazing Corner",                  category: "Sky Deck" },
  { name: "Yoga Lawn",                           category: "Sky Deck" },
  { name: "1.2 M Wide Walkway",                  category: "Sky Deck" },
  { name: "Sky Gym",                             category: "Sky Deck" },
  { name: "Sunset Lounge",                       category: "Sky Deck" },
  { name: "Outdoor Screen with Seating Lounge",  category: "Sky Deck" },
  { name: "Pebble Seating",                      category: "Sky Deck" },
  { name: "Mini Golf",                           category: "Sky Deck" },
  { name: "Reflexology Pathway",                 category: "Sky Deck" },
  { name: "Meditation Pods",                     category: "Sky Deck" },
  { name: "Reading Corner",                      category: "Sky Deck" },
  { name: "Pickleball Court",                    category: "Sky Deck" },
  { name: "Planters",                            category: "Sky Deck" },
  { name: "Seating Alcove",                      category: "Sky Deck" },
  { name: "Viewing Deck Seating",                category: "Sky Deck" },
  { name: "Hangout Corner",                      category: "Sky Deck" },

  // ── General (appear in multiple zones, stored once) ────────────────────────
  { name: "Sculpture",       category: "General" },
  { name: "Seating Deck",    category: "General" },
  { name: "Stepped Seating", category: "General" },
  { name: "Bar Counter",     category: "General" },
  { name: "Pathway",         category: "General" },
  { name: "Planter",         category: "General" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Media — file paths relative to uploads/
// ─────────────────────────────────────────────────────────────────────────────

/** Project-level hero/gallery images (curated from both BHK folders) */
const PROJECT_IMAGES = [
  url("dosti 604", "2bhk", "Dosti 604 Living Room 1.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Living Room 2.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Bedroom 1.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Living Room 1.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Living Room 2.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Bedroom-1.jpg"),
];

/** 2 BHK — all room images (12 images, video separate) */
const IMAGES_2BHK = [
  url("dosti 604", "2bhk", "Dosti 604 Living Room 1.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Living Room 2.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Bedroom 1.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Bedroom 2.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Bedroom 3.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Bedroom 4.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Dining Area.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Kitchen.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Kitchen 2.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Washroom 1.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 Washroom 3.jpg"),
  url("dosti 604", "2bhk", "Dosti 604 wadrobe.jpg"),
];

const FLOOR_PLAN_2BHK = url("dosti 604", "2bhk", "floor plan.png");

/** Sample flat walkthrough video (served as a static file) */
const VIDEO_2BHK = url(
  "dosti 604",
  "2bhk",
  "DOSTI EDEN 2 BHK SAMPLE FLAT_21 JUNE 2023 (1).mp4"
);

/** 3 BHK — all room images (12 images) */
const IMAGES_3BHK = [
  url("dosti 604", "3bhk", "Dosti 604 Living Room 1.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Living Room 2.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Living-Room-3.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Bedroom-1.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Bedroom 2.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Bedroom 3.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Dining Area.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Kitchen.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Washroom 1.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Washroom 2.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Washroom 3.jpg"),
  url("dosti 604", "3bhk", "Dosti 604 Washroom 4.jpg"),
];

const FLOOR_PLAN_3BHK = url("dosti 604", "3bhk", "floorplan.png");

// ─────────────────────────────────────────────────────────────────────────────
// Main seed function
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀  Starting Dosti 604 seed...\n");

  // ── Step 1: Upsert amenities ─────────────────────────────────────────────
  console.log(`📋  Upserting ${AMENITIES_DATA.length} amenities...`);
  for (const amenity of AMENITIES_DATA) {
    await prisma.amenity.upsert({
      where: { name: amenity.name },
      update: { category: amenity.category },
      create: amenity,
    });
  }
  console.log("    ✅  Amenities ready.\n");

  // Fetch all amenity IDs we just upserted
  const amenities = await prisma.amenity.findMany({
    where: { name: { in: AMENITIES_DATA.map((a) => a.name) } },
  });

  // ── Step 2: Delete existing Dosti 604 to keep this script idempotent ─────
  const existing = await prisma.project.findFirst({
    where: { name: "Dosti 604" },
  });
  if (existing) {
    console.log("🗑️   Removing existing Dosti 604 project (re-seeding)...");
    await prisma.property.deleteMany({ where: { projectId: existing.id } });
    await prisma.project.delete({ where: { id: existing.id } });
    console.log("    ✅  Removed.\n");
  }

  // ── Step 3: Create Project ───────────────────────────────────────────────
  console.log("🏢  Creating Project: Dosti 604...");
  const project = await prisma.project.create({
    data: {
      name: "Dosti 604",
      description:
        "Dosti 604 is a premium ready-to-move residential project nestled in the heart of Wagle Estate, Thane. " +
        "Offering thoughtfully designed 2 BHK and 3 BHK apartments, it features three levels of world-class amenities — " +
        "an Arrival Deck at ground level, a lavish Leisure Deck with pool and party spaces, and a panoramic Sky Deck " +
        "for relaxation and recreation. Built by the trusted Dosti Realty brand.",
      locality: "Wagle Estate",
      city: "Thane",
      address: "Dosti 604, Wagle Estate, Thane",
      // reraId: "P51700XXXXXX", // ← Uncomment and fill in when you have the RERA ID
      images: {
        create: PROJECT_IMAGES.map((imageUrl, i) => ({
          url: imageUrl,
          order: i,
        })),
      },
      amenities: {
        create: amenities.map((a) => ({ amenityId: a.id })),
      },
    },
  });
  console.log(`    ✅  Project created — ID: ${project.id}\n`);

  // ── Step 4: Create 2 BHK Property ────────────────────────────────────────
  console.log("🏠  Creating Property: 2 BHK...");
  const property2Bhk = await prisma.property.create({
    data: {
      title: "Dosti 604 — 2 BHK",
      description:
        "Spacious 2 BHK apartment at Dosti 604, Wagle Estate, Thane. " +
        "Features a modern kitchen, master bedroom with attached washroom, " +
        "common bedroom, wardrobe, and a bright living & dining area. " +
        "Ready to move in with premium finishes throughout.",
      type: "FLAT",
      priceType: "SALE",
      carpetArea: "700 - 760 Sq. Ft.",
      bhk: [2],
      locality: "Wagle Estate",
      city: "Thane",
      address: "Dosti 604, Wagle Estate, Thane",
      projectId: project.id,
      constructionStatus: "READY_TO_MOVE",
      tag: "CITY_VIEW",
      // Base price is auto-set from units — smallest unit × pricePerSqft
      basePrice: 700 * PRICE_PER_SQFT_2BHK,
      videoUrl: VIDEO_2BHK,
      images: {
        create: IMAGES_2BHK.map((imageUrl, i) => ({
          url: imageUrl,
          order: i,
        })),
      },
      units: {
        create: [
          {
            bhk: 2,
            carpetArea: 700,
            pricePerSqft: PRICE_PER_SQFT_2BHK,
            totalPrice: 700 * PRICE_PER_SQFT_2BHK,
          },
          {
            bhk: 2,
            carpetArea: 760,
            pricePerSqft: PRICE_PER_SQFT_2BHK,
            totalPrice: 760 * PRICE_PER_SQFT_2BHK,
          },
        ],
      },
      floorPlans: {
        create: [
          {
            url: FLOOR_PLAN_2BHK,
            label: "2 BHK Floor Plan",
            order: 0,
          },
        ],
      },
      amenities: {
        create: amenities.map((a) => ({ amenityId: a.id })),
      },
    },
  });
  console.log(`    ✅  2 BHK created — ID: ${property2Bhk.id}`);
  console.log(
    `       Price: ₹${(700 * PRICE_PER_SQFT_2BHK).toLocaleString("en-IN")} – ₹${(760 * PRICE_PER_SQFT_2BHK).toLocaleString("en-IN")}\n`
  );

  // ── Step 5: Create 3 BHK Property ────────────────────────────────────────
  console.log("🏠  Creating Property: 3 BHK...");
  const property3Bhk = await prisma.property.create({
    data: {
      title: "Dosti 604 — 3 BHK",
      description:
        "Elegant 3 BHK apartment at Dosti 604, Wagle Estate, Thane. " +
        "Features three bedrooms, multiple washrooms, a modern kitchen, " +
        "spacious living & dining area, and premium finishes. " +
        "Ready to move in — enjoy stunning city views from every corner.",
      type: "FLAT",
      priceType: "SALE",
      carpetArea: "960 - 1100 Sq. Ft.",
      bhk: [3],
      locality: "Wagle Estate",
      city: "Thane",
      address: "Dosti 604, Wagle Estate, Thane",
      projectId: project.id,
      constructionStatus: "READY_TO_MOVE",
      tag: "CITY_VIEW",
      basePrice: 960 * PRICE_PER_SQFT_3BHK,
      images: {
        create: IMAGES_3BHK.map((imageUrl, i) => ({
          url: imageUrl,
          order: i,
        })),
      },
      units: {
        create: [
          {
            bhk: 3,
            carpetArea: 960,
            pricePerSqft: PRICE_PER_SQFT_3BHK,
            totalPrice: 960 * PRICE_PER_SQFT_3BHK,
          },
          {
            bhk: 3,
            carpetArea: 1100,
            pricePerSqft: PRICE_PER_SQFT_3BHK,
            totalPrice: 1100 * PRICE_PER_SQFT_3BHK,
          },
        ],
      },
      floorPlans: {
        create: [
          {
            url: FLOOR_PLAN_3BHK,
            label: "3 BHK Floor Plan",
            order: 0,
          },
        ],
      },
      amenities: {
        create: amenities.map((a) => ({ amenityId: a.id })),
      },
    },
  });
  console.log(`    ✅  3 BHK created — ID: ${property3Bhk.id}`);
  console.log(
    `       Price: ₹${(960 * PRICE_PER_SQFT_3BHK).toLocaleString("en-IN")} – ₹${(1100 * PRICE_PER_SQFT_3BHK).toLocaleString("en-IN")}\n`
  );

  console.log("🎉  Dosti 604 seed completed successfully!");
  console.log("─────────────────────────────────────────────");
  console.log(`   Project ID  : ${project.id}`);
  console.log(`   2 BHK ID    : ${property2Bhk.id}`);
  console.log(`   3 BHK ID    : ${property3Bhk.id}`);
  console.log(`   Amenities   : ${amenities.length} linked`);
  console.log("─────────────────────────────────────────────");
}

main()
  .catch((e) => {
    console.error("❌  Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
