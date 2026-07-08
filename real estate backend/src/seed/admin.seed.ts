import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: {
      email: process.env.ADMIN_EMAIL!,
    },
  });

  if (adminExists) {
    console.log("✅ Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

  await prisma.user.create({
    data: {
      name: process.env.ADMIN_NAME!,
      email: process.env.ADMIN_EMAIL!,
      password: hashedPassword, 
      role: Role.ADMIN,
      isVerified: true,
    },
  });

  console.log("✅ Admin created successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });