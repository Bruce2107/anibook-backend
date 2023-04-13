import { Request, Response } from 'express';
import { ReportRepository } from '@adapter/udesc/report/ReportRepository';

export class GetSerieMusicController {
  constructor(private getSerieMusicUseCase: GetSerieMusicUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { language } = request.query;
      const serieMusic = await this.getSerieMusicUseCase.execute(
        (language as string) || 'Portuguese'
      );
      return response.status(200).json({ data: serieMusic });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetSerieMusicUseCase {
  constructor(private reportRepository: ReportRepository) {}
  async execute(language: string) {
    return this.reportRepository.getSeriesWithLanguageMusics(language);
  }
}
