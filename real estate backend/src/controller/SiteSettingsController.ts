import { Request, Response } from "express";
import { SiteSettingsService } from "../service/SiteSettingsService";

const service = new SiteSettingsService();

export class SiteSettingsController {
  async getSettings(req: Request, res: Response) {
    try {
      const settings = await service.getSettings();
      res.status(200).json({ success: true, data: settings });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateSettings(req: Request, res: Response) {
    try {
      const { agentReraNumber, agentReraValidUpTo } = req.body;
      const settings = await service.updateSettings({ agentReraNumber, agentReraValidUpTo });
      res.status(200).json({ success: true, data: settings, message: "Settings updated successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
