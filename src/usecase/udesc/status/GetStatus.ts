import { StatusRepository } from '@adapter/udesc/status/StatusRepository';
import { Request, Response } from 'express';

export class GetStatusController {
  constructor(private getStatusUseCase: GetStatusUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const status = await this.getStatusUseCase.execute(id);

      if (!status) return response.sendStatus(404);
      return response.status(200).json({ status });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetStatusUseCase {
  constructor(private statusRepository: StatusRepository) {}
  async execute(id: string) {
    return isNaN(Number(id))
      ? this.statusRepository.getStatus(id)
      : this.statusRepository.getStatusById(id);
  }
}
