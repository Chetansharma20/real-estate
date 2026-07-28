-- Step 1: Drop old tables from the old schema (Property etc already dropped or does not exist)
-- Step 2: Drop old tables from the old schema
DROP TABLE IF EXISTS "Property" CASCADE;
DROP TABLE IF EXISTS "PropertyImage" CASCADE;
DROP TABLE IF EXISTS "PropertyAmenity" CASCADE;

-- Step 2b: Add category column to Amenity (if not exists)
ALTER TABLE "Amenity" ADD COLUMN IF NOT EXISTS "category" TEXT NOT NULL DEFAULT 'General';

-- Step 3: Create new enums (only if not exists)
DO $$ BEGIN
  CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'BROCHURE', 'FLOOR_PLAN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ProjectStatus" AS ENUM ('ACTIVE', 'SOLD_OUT', 'UPCOMING', 'INACTIVE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ConstructionStatus" AS ENUM ('UNDER_CONSTRUCTION', 'READY_TO_MOVE', 'NEW_LAUNCH', 'NONE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "PropertyView" AS ENUM ('GARDEN', 'POOL', 'LAKE', 'CITY', 'NONE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Drop old enums no longer used
DROP TYPE IF EXISTS "PriceType" CASCADE;
DROP TYPE IF EXISTS "PropertyTag" CASCADE;

-- Step 4: CreateTable Township
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
);
CREATE UNIQUE INDEX IF NOT EXISTS "Township_slug_key" ON "Township"("slug");

-- Step 5: CreateTable Project
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
);
CREATE UNIQUE INDEX IF NOT EXISTS "Project_slug_key" ON "Project"("slug");

ALTER TABLE "Project" ADD CONSTRAINT "Project_townshipId_fkey"
  FOREIGN KEY ("townshipId") REFERENCES "Township"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Step 6: CreateTable ProjectMedia
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
);

-- Step 7: CreateTable ProjectConfiguration
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
);

-- Step 8: CreateTable ProjectAmenity
CREATE TABLE IF NOT EXISTS "ProjectAmenity" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "amenityId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProjectAmenity_pkey" PRIMARY KEY ("id")
);

-- FKs for ProjectMedia
ALTER TABLE "ProjectMedia" ADD CONSTRAINT "ProjectMedia_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProjectMedia" ADD CONSTRAINT "ProjectMedia_configurationId_fkey"
  FOREIGN KEY ("configurationId") REFERENCES "ProjectConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- FK for ProjectConfiguration
ALTER TABLE "ProjectConfiguration" ADD CONSTRAINT "ProjectConfiguration_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- FKs for ProjectAmenity
ALTER TABLE "ProjectAmenity" ADD CONSTRAINT "ProjectAmenity_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProjectAmenity" ADD CONSTRAINT "ProjectAmenity_amenityId_fkey"
  FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 9: Update Lead table to reference Project instead of Property
ALTER TABLE "Lead" DROP COLUMN IF EXISTS "propertyId";
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "projectId" TEXT;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
