import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
const p = new PrismaClient();

async function main() {
  // Update Dosti West County township coordinates (Balkum, Thane West)
  const result = await p.township.updateMany({
    where: { name: { contains: 'West County' } },
    data: { latitude: 19.2208, longitude: 72.9745 }
  });
  console.log(`✅ Updated ${result.count} township(s) — Dosti West County → 19.2208, 72.9745 (Balkum, Thane West)`);
}

main().finally(() => p.$disconnect());
