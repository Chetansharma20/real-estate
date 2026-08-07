/**
 * One-time script: Upload all frontend /public static images to Cloudinary
 *
 * Run from the real-estate-frontend directory:
 *   node scripts/upload-public-to-cloudinary.mjs
 *
 * Output: prints each filename and its new Cloudinary URL.
 * Copy those URLs into the component files as instructed.
 */

import { v2 as cloudinary } from "cloudinary";
import { readdir, stat } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../public");

cloudinary.config({
  cloud_name: "duvw71tdz",
  api_key:    "735326952538986",
  api_secret: "6NyIGLeoP6f4NSPQtHQ06kstlY4",
});

// Files to upload (relative to /public)
const FILES = [
  // Hero slides
  { local: "images/hero-slide-1.webp", folder: "real-estate/frontend/hero",     publicId: "hero-slide-1" },
  { local: "images/hero-slide-2.webp", folder: "real-estate/frontend/hero",     publicId: "hero-slide-2" },
  { local: "images/hero-slide-3.webp", folder: "real-estate/frontend/hero",     publicId: "hero-slide-3" },
  // Service images
  { local: "images/service-investment.webp", folder: "real-estate/frontend/services", publicId: "service-investment" },
  { local: "images/service-legal.webp",      folder: "real-estate/frontend/services", publicId: "service-legal"      },
  { local: "images/service-site-visit.webp", folder: "real-estate/frontend/services", publicId: "service-site-visit" },
  // Backgrounds
  { local: "images/contact-bg.webp",  folder: "real-estate/frontend/backgrounds", publicId: "contact-bg"  },
  { local: "images/hero-bg.webp",     folder: "real-estate/frontend/backgrounds", publicId: "hero-bg"     },
  // Team photos
  { local: "kartik-mudaliar.webp",   folder: "real-estate/frontend/team", publicId: "kartik-mudaliar"  },
  { local: "akshay-mithiya.webp",    folder: "real-estate/frontend/team", publicId: "akshay-mithiya"   },
  { local: "somesh-ghosh.webp",      folder: "real-estate/frontend/team", publicId: "somesh-ghosh"     },
  { local: "shyam-mithiya.webp",     folder: "real-estate/frontend/team", publicId: "shyam-mithiya"    },
  { local: "sandeep-raut.webp",      folder: "real-estate/frontend/team", publicId: "sandeep-raut"     },
  // Logo
  { local: "logo.webp",              folder: "real-estate/frontend",      publicId: "logo"             },
  // Modal image
  { local: "visit-modal-family.png", folder: "real-estate/frontend",      publicId: "visit-modal-family" },
];

async function main() {
  console.log("🚀 Uploading frontend static images to Cloudinary...\n");

  const results = {};

  for (const f of FILES) {
    const localPath = path.join(PUBLIC_DIR, f.local);
    try {
      const result = await cloudinary.uploader.upload(localPath, {
        folder:      f.folder,
        public_id:   f.publicId,
        overwrite:   true,
        resource_type: "image",
        format: "webp",
      });
      results[f.local] = result.secure_url;
      console.log(`✓  ${f.local}`);
      console.log(`   → ${result.secure_url}\n`);
    } catch (err) {
      console.error(`✗  ${f.local}: ${err.message}\n`);
    }
  }

  console.log("\n📋 Copy these URLs into your components:\n");
  console.log(JSON.stringify(results, null, 2));
}

main();
