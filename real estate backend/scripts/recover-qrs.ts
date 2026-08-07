import * as dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();
const FRONTEND_URL = "https://www.bricksage.in";

async function main() {
  console.log("🚀 Starting RERA QR Code Recovery from Next.js Cache...");
  const projects = await prisma.project.findMany({ 
    where: { reraQrCode: { not: null } } 
  });
  
  let recovered = 0;

  for (const project of projects) {
    const url = project.reraQrCode!;
    if (url.includes("res.cloudinary.com")) continue;

    console.log(`\n🔍 Trying to recover QR for project: ${project.title}`);
    
    // Construct the Next.js cache URL
    // Format: /_next/image?url=ENCODED_ORIGINAL_URL&w=1080&q=75
    const cachedUrl = `${FRONTEND_URL}/_next/image?url=${encodeURIComponent(url)}&w=1080&q=75`;
    
    try {
      const response = await axios.get(cachedUrl, { responseType: 'arraybuffer' });
      
      // Save temporarily
      const tempPath = path.join(__dirname, `../uploads/temp-recovery-${project.id}.webp`);
      fs.writeFileSync(tempPath, response.data);
      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(tempPath, {
        folder: "real-estate/projects/rera",
        resource_type: "image"
      });
      
      // Update DB
      await prisma.project.update({ 
        where: { id: project.id }, 
        data: { reraQrCode: result.secure_url } 
      });
      
      console.log(`  ✅ Recovered successfully! -> ${result.secure_url}`);
      fs.unlinkSync(tempPath); // cleanup
      recovered++;
      
    } catch (err: any) {
      console.log(`  ❌ Failed to recover from cache: ${err.message}`);
    }
  }
  
  console.log(`\n🎉 Recovery complete! Recovered ${recovered} QR codes.`);
  await prisma.$disconnect();
}

main().catch(console.error);
