import { ReportRepository } from '@adapter/udesc/report/ReportRepository';
import { Request, Response } from 'express';

export class GetSerieStudioController {
  constructor(private getSerieStudioUseCase: GetSerieStudioUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const serieStudio = await this.getSerieStudioUseCase.execute();
      return response.status(200).json({ data: serieStudio });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetSerieStudioUseCase {
  constructor(private reportRepository: ReportRepository) {}
  async execute() {
    return this.reportRepository.getStudioWithAtLeastOneSerieInThreeStreaming();
  }
}
