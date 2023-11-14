import { ReportRepository } from '@adapter/udesc/report/ReportRepository';
import { Request, Response } from 'express';

export class GetHomeController {
  constructor(private getHomeUseCase: GetHomeUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const home = await this.getHomeUseCase.execute();
      return response.status(200).json({ data: home });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetHomeUseCase {
  constructor(private reportRepository: ReportRepository) {}
  async execute() {
    return this.reportRepository.getHome();
  }
}
