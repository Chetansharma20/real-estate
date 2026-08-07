/**
 * One-time Migration Script: VPS uploads → Cloudinary
 *
 * What it does:
 * 1. Reads all ProjectMedia URLs from the database
 * 2. Uploads each image to Cloudinary (preserving folder structure)
 * 3. Updates the DB record with the new Cloudinary URL
 * 4. Does the same for Project.reraQrCode and BlogPost.coverImage
 *
 * Run on VPS:
 *   ts-node --transpile-only scripts/migrate-to-cloudinary.ts
 *
 * Safe to re-run — already-migrated URLs (containing res.cloudinary.com) are skipped.
 */

import * as dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
// Root of the uploads directory on the VPS (relative to project root)
const UPLOADS_ROOT = path.resolve(__dirname, "../uploads");

// ── Helpers ──────────────────────────────────────────────────────────────────

function localPathFromUrl(url: string): string | null {
  // e.g. http://localhost:5000/uploads/dosti-pine/cover-image.jpg
  // → /var/www/.../uploads/dosti-pine/cover-image.jpg
  const uploadsIdx = url.indexOf("/uploads/");
  if (uploadsIdx === -1) return null;
  const relativePath = url.slice(uploadsIdx + "/uploads/".length);
  return path.join(UPLOADS_ROOT, decodeURIComponent(relativePath));
}

function cloudinaryFolder(url: string): string {
  // Derive Cloudinary folder from the local path structure:
  // uploads/dosti-pine/amenities/… → real-estate/projects/amenities
  const lower = url.toLowerCase();
  if (lower.includes("/amenities/"))   return "real-estate/projects/amenities";
  if (lower.includes("/flat images/") || lower.includes("/flat_images/") || lower.includes("/flat-images/"))
                                       return "real-estate/projects/flats";
  if (lower.includes("/floor_plan/") || lower.includes("/floor-plan/"))
                                       return "real-estate/projects/floor-plans";
  if (lower.includes("/rera/"))        return "real-estate/projects/rera";
  if (lower.includes("/cover"))        return "real-estate/projects/covers";
  if (lower.includes("/blog/"))        return "real-estate/blog";
  return "real-estate/projects/gallery";
}

async function uploadToCloudinary(localPath: string, folder: string): Promise<string | null> {
  if (!fs.existsSync(localPath)) {
    console.warn(`  ⚠  File not found: ${localPath}`);
    return null;
  }
  try {
    const ext = path.extname(localPath).toLowerCase();
    const isPdf = ext === ".pdf";
    const result = await cloudinary.uploader.upload(localPath, {
      folder,
      resource_type: isPdf ? "raw" : "image",
      format: isPdf ? undefined : "webp",
    });
    return result.secure_url;
  } catch (err: any) {
    console.error(`  ✗  Upload failed for ${localPath}:`, err.message);
    return null;
  }
}

// ── Migration steps ───────────────────────────────────────────────────────────

async function migrateProjectMedia() {
  console.log("\n📂  Migrating ProjectMedia...");
  const records = await prisma.projectMedia.findMany();
  let migrated = 0;
  let skipped  = 0;

  for (const record of records) {
    if (record.url.includes("res.cloudinary.com")) { skipped++; continue; }

    const localPath = localPathFromUrl(record.url);
    if (!localPath) { skipped++; continue; }

    const folder      = cloudinaryFolder(record.url);
    const newUrl      = await uploadToCloudinary(localPath, folder);

    if (newUrl) {
      await prisma.projectMedia.update({ where: { id: record.id }, data: { url: newUrl } });
      console.log(`  ✓  ${path.basename(localPath)} → ${newUrl}`);
      migrated++;
    }
  }
  console.log(`  Done. Migrated: ${migrated}, Skipped: ${skipped}`);
}

async function migrateReraQrCodes() {
  console.log("\n🔳  Migrating RERA QR codes...");
  const projects = await prisma.project.findMany({ where: { reraQrCode: { not: null } } });
  let migrated = 0;

  for (const project of projects) {
    const url = project.reraQrCode!;
    if (url.includes("res.cloudinary.com")) continue;

    const localPath = localPathFromUrl(url);
    if (!localPath) continue;

    const newUrl = await uploadToCloudinary(localPath, "real-estate/projects/rera");
    if (newUrl) {
      await prisma.project.update({ where: { id: project.id }, data: { reraQrCode: newUrl } });
      console.log(`  ✓  ${project.title} QR → ${newUrl}`);
      migrated++;
    }
  }
  console.log(`  Done. Migrated: ${migrated}`);
}

async function migrateBlogCovers() {
  console.log("\n📝  Migrating Blog cover images...");
  const posts = await prisma.blogPost.findMany({ where: { coverImage: { not: null } } });
  let migrated = 0;

  for (const post of posts) {
    const url = post.coverImage!;
    if (url.includes("res.cloudinary.com")) continue;

    const localPath = localPathFromUrl(url);
    if (!localPath) continue;

    const newUrl = await uploadToCloudinary(localPath, "real-estate/blog");
    if (newUrl) {
      await prisma.blogPost.update({ where: { id: post.id }, data: { coverImage: newUrl } });
      console.log(`  ✓  "${post.title}" cover → ${newUrl}`);
      migrated++;
    }
  }
  console.log(`  Done. Migrated: ${migrated}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀  Starting Cloudinary migration...");
  console.log(`    Cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`);

  await migrateProjectMedia();
  await migrateReraQrCodes();
  await migrateBlogCovers();

  console.log("\n✅  Migration complete!");
  console.log("    You can now safely delete the /uploads folder from your VPS.");
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error("Migration failed:", err);
  await prisma.$disconnect();
  process.exit(1);
});
