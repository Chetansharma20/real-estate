import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SiteSettingsRepository {
  async getSettings() {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "global",
          agentReraNumber: "",
          agentReraValidUpTo: "",
        },
      });
    }

    return settings;
  }

  async updateSettings(data: { agentReraNumber?: string; agentReraValidUpTo?: string }) {
    return await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: data,
      create: {
        id: "global",
        agentReraNumber: data.agentReraNumber || "",
        agentReraValidUpTo: data.agentReraValidUpTo || "",
      },
    });
  }
}
