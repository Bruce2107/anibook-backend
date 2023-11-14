import { ReportRepository } from '@adapter/udesc/report/ReportRepository';
import { Request, Response } from 'express';

export class GetDetailsController {
  constructor(private getDetailsUseCase: GetDetailsUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { user } = request.query;
      const details = await this.getDetailsUseCase.execute(
        id,
        user?.toString()
      );
      return response.status(200).json({ data: details });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetDetailsUseCase {
  constructor(private reportRepository: ReportRepository) {}
  async execute(name: string, user?: string) {
    return this.reportRepository.getDetails(name, user);
  }
}
