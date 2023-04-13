import { ReportRepository } from '@adapter/udesc/report/ReportRepository';
import { Request, Response } from 'express';

export class GetSerieStreamingController {
  constructor(private getSerieStreamingUseCase: GetSerieStreamingUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const serieStreaming = await this.getSerieStreamingUseCase.execute();
      return response.status(200).json({ data: serieStreaming });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetSerieStreamingUseCase {
  constructor(private reportRepository: ReportRepository) {}
  async execute() {
    return this.reportRepository.getStreamingsWithSeriesThatAtLeastTwoAuthor();
  }
}
