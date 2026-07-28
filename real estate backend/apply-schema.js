const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  console.log('Applying remaining schema changes...');

  // Add category column to Amenity
  await p.$executeRawUnsafe(`ALTER TABLE "Amenity" ADD COLUMN IF NOT EXISTS "category" TEXT NOT NULL DEFAULT 'General'`);
  console.log('✅ Added category to Amenity');

  // Create new enums (ignore if already exists)
  const enums = [
    [`"MediaType"`, `'IMAGE', 'BROCHURE', 'FLOOR_PLAN'`],
    [`"ProjectStatus"`, `'ACTIVE', 'SOLD_OUT', 'UPCOMING', 'INACTIVE'`],
    [`"ConstructionStatus"`, `'UNDER_CONSTRUCTION', 'READY_TO_MOVE', 'NEW_LAUNCH', 'NONE'`],
    [`"PropertyView"`, `'GARDEN', 'POOL', 'LAKE', 'CITY', 'NONE'`],
  ];

  for (const [name, values] of enums) {
    try {
      await p.$executeRawUnsafe(`CREATE TYPE ${name} AS ENUM (${values})`);
      console.log(`✅ Created enum ${name}`);
    } catch (e) {
      console.log(`⚠️ Enum ${name} already exists, skipping`);
    }
  }

  // Drop old enums
  for (const e of ['"PriceType"', '"PropertyTag"']) {
    try {
      await p.$executeRawUnsafe(`DROP TYPE IF EXISTS ${e} CASCADE`);
      console.log(`✅ Dropped old enum ${e}`);
    } catch (err) {
      console.log(`  Skipped: ${e}`);
    }
  }

  // Create Township
  await p.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Township" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "description" TEXT,
      "locality" TEXT NOT NULL,
      "city" TEXT NOT NULL DEFAULT 'Mumbai',
      "address" TEXT NOT NULL DEFAULT '',
      "latitude" DOUBLE PRECISION,
      "longitude" DOUBLE PRECISION,
      "googleMapUrl" TEXT,
      "slug" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
      CONSTRAINT "Township_pkey" PRIMARY KEY ("id")
    )
  `);
  console.log('✅ Township table created');
  await p.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Township_slug_key" ON "Township"("slug")`);

  // Create Project
  await p.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Project" (
      "id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "description" TEXT,
      "propertyType" "PropertyType" NOT NULL DEFAULT 'APARTMENT',
      "constructionStatus" "ConstructionStatus" NOT NULL DEFAULT 'UNDER_CONSTRUCTION',
      "propertyView" "PropertyView" NOT NULL DEFAULT 'NONE',
      "videoUrl" TEXT,
      "featured" BOOLEAN NOT NULL DEFAULT false,
      "status" "ProjectStatus" NOT NULL DEFAULT 'ACTIVE',
      "townshipId" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
      CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
    )
  `);
  console.log('✅ Project table created');
  await p.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Project_slug_key" ON "Project"("slug")`);

  try {
    await p.$executeRawUnsafe(`
      ALTER TABLE "Project" ADD CONSTRAINT "Project_townshipId_fkey"
        FOREIGN KEY ("townshipId") REFERENCES "Township"("id") ON DELETE SET NULL ON UPDATE CASCADE
    `);
    console.log('✅ Project->Township FK added');
  } catch (e) { console.log('  FK Project->Township already exists'); }

  // Create ProjectMedia
  await p.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ProjectMedia" (
      "id" TEXT NOT NULL,
      "projectId" TEXT NOT NULL,
      "configurationId" TEXT,
      "url" TEXT NOT NULL,
      "type" "MediaType" NOT NULL DEFAULT 'IMAGE',
      "isCover" BOOLEAN NOT NULL DEFAULT false,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "ProjectMedia_pkey" PRIMARY KEY ("id")
    )
  `);
  console.log('✅ ProjectMedia table created');

  // Create ProjectConfiguration
  await p.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ProjectConfiguration" (
      "id" TEXT NOT NULL,
      "projectId" TEXT NOT NULL,
      "bhk" INTEGER NOT NULL DEFAULT 1,
      "carpetArea" DOUBLE PRECISION NOT NULL DEFAULT 0,
      "builtUpArea" DOUBLE PRECISION,
      "superBuiltUpArea" DOUBLE PRECISION,
      "pricePerSqft" DOUBLE PRECISION NOT NULL DEFAULT 0,
      "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
      "label" TEXT,
      "availableUnits" INTEGER,
      "isAvailable" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
      CONSTRAINT "ProjectConfiguration_pkey" PRIMARY KEY ("id")
    )
  `);
  console.log('✅ ProjectConfiguration table created');

  // Create ProjectAmenity
  await p.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ProjectAmenity" (
      "id" TEXT NOT NULL,
      "projectId" TEXT NOT NULL,
      "amenityId" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "ProjectAmenity_pkey" PRIMARY KEY ("id")
    )
  `);
  console.log('✅ ProjectAmenity table created');

  // Add FKs
  const fks = [
    [`ALTER TABLE "ProjectMedia" ADD CONSTRAINT "ProjectMedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE`],
    [`ALTER TABLE "ProjectMedia" ADD CONSTRAINT "ProjectMedia_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "ProjectConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE`],
    [`ALTER TABLE "ProjectConfiguration" ADD CONSTRAINT "ProjectConfiguration_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE`],
    [`ALTER TABLE "ProjectAmenity" ADD CONSTRAINT "ProjectAmenity_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE`],
    [`ALTER TABLE "ProjectAmenity" ADD CONSTRAINT "ProjectAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE`],
  ];

  for (const [sql] of fks) {
    try {
      await p.$executeRawUnsafe(sql);
      console.log('✅ FK added');
    } catch (e) { console.log('  FK already exists, skipped'); }
  }

  // Update Lead table
  try {
    await p.$executeRawUnsafe(`ALTER TABLE "Lead" DROP COLUMN IF EXISTS "propertyId"`);
    console.log('✅ Removed propertyId from Lead');
  } catch (e) { console.log('  propertyId already removed'); }

  try {
    await p.$executeRawUnsafe(`ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "projectId" TEXT`);
    await p.$executeRawUnsafe(`ALTER TABLE "Lead" ADD CONSTRAINT "Lead_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    console.log('✅ Added projectId to Lead');
  } catch (e) { console.log('  Lead.projectId already exists'); }

  console.log('\n=== ALL DONE ===');
  await p.$disconnect();
}

main().catch(e => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
