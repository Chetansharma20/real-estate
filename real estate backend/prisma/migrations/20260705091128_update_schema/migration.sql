/*
  Warnings:

  - You are about to drop the column `provider` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inquiry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SellRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Testimonial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoTourRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitSchedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('CALLBACK', 'SITE_VISIT', 'VIDEO_TOUR', 'SELL_REQUEST');

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_userId_fkey";

-- DropForeignKey
ALTER TABLE "SellRequest" DROP CONSTRAINT "SellRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoTourRequest" DROP CONSTRAINT "VideoTourRequest_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "VideoTourRequest" DROP CONSTRAINT "VideoTourRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "VisitSchedule" DROP CONSTRAINT "VisitSchedule_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "VisitSchedule" DROP CONSTRAINT "VisitSchedule_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "provider";

-- DropTable
DROP TABLE "Favorite";

-- DropTable
DROP TABLE "Inquiry";

-- DropTable
DROP TABLE "SellRequest";

-- DropTable
DROP TABLE "Testimonial";

-- DropTable
DROP TABLE "VideoTourRequest";

-- DropTable
DROP TABLE "VisitSchedule";

-- DropEnum
DROP TYPE "AuthProvider";

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" "LeadType" NOT NULL,
    "message" TEXT,
    "preferredDate" TIMESTAMP(3),
    "preferredSlot" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_propertyId_idx" ON "Lead"("propertyId");

-- CreateIndex
CREATE INDEX "Lead_phone_idx" ON "Lead"("phone");

-- CreateIndex
CREATE INDEX "Lead_type_idx" ON "Lead"("type");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
