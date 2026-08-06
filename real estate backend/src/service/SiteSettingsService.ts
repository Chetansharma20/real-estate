import { SiteSettingsRepository } from "../repositories/SiteSettingsRepository";

export class SiteSettingsService {
  private repository: SiteSettingsRepository;

  constructor() {
    this.repository = new SiteSettingsRepository();
  }

  async getSettings() {
    return await this.repository.getSettings();
  }

  async updateSettings(data: { agentReraNumber?: string; agentReraValidUpTo?: string }) {
    return await this.repository.updateSettings(data);
  }
}
