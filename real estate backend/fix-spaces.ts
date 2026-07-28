import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const uploadsDir = path.join(__dirname, 'uploads');

function safeRenameFiles(dir: string) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      safeRenameFiles(fullPath);
    }
    
    // Some files were partially renamed, some still have spaces.
    // Let's rename them safely.
    if (file.includes(' ')) {
      const newFile = file.replace(/ /g, '-');
      const newFullPath = path.join(dir, newFile);
      try {
        fs.renameSync(fullPath, newFullPath);
        console.log(`Renamed File: ${file} -> ${newFile}`);
      } catch (err: any) {
        console.error(`Skipped renaming ${file}: ${err.message}`);
      }
    }
  }
}

// Rename directories separately from inside-out
function safeRenameDirs(dir: string) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      safeRenameDirs(fullPath);
      if (file.includes(' ')) {
        const newFile = file.replace(/ /g, '-');
        const newFullPath = path.join(dir, newFile);
        try {
          fs.renameSync(fullPath, newFullPath);
          console.log(`Renamed Dir: ${file} -> ${newFile}`);
        } catch (err: any) {
          console.error(`Skipped renaming dir ${file}: ${err.message}`);
        }
      }
    }
  }
}

async function fixDb() {
  console.log("Renaming files on disk...");
  safeRenameFiles(uploadsDir);
  safeRenameDirs(uploadsDir);

  console.log("\nUpdating database records (replacing %20 with hyphen)...");
  
  let updatedMedia = 0;
  let updatedBlogs = 0;

  // 1. Process ProjectMedia (DB stores %20 for spaces)
  const media = await prisma.projectMedia.findMany({
    where: { url: { contains: '%20' } }
  });
  
  for (const m of media) {
    const newUrl = m.url.replace(/%20/g, '-');
    await prisma.projectMedia.update({
      where: { id: m.id },
      data: { url: newUrl }
    });
    updatedMedia++;
    console.log(`Updated Media: ${newUrl}`);
  }

  // 2. Process BlogPost coverImages
  const posts = await prisma.blogPost.findMany({
    where: { coverImage: { contains: '%20' } }
  });
  
  for (const p of posts) {
    if (!p.coverImage) continue;
    const newUrl = p.coverImage.replace(/%20/g, '-');
    await prisma.blogPost.update({
      where: { id: p.id },
      data: { coverImage: newUrl }
    });
    updatedBlogs++;
    console.log(`Updated Blog: ${newUrl}`);
  }

  console.log(`\nMigration complete. Media updated: ${updatedMedia}, Blogs updated: ${updatedBlogs}.`);
}

fixDb().catch(e => {
  console.error(e);
}).finally(() => {
  prisma.$disconnect();
});
