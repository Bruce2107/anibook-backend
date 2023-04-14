import { StatusRepository } from '@adapter/udesc/status/StatusRepository';
import { Request, Response } from 'express';

export class GetAllStatusController {
  constructor(private getAllStatusUseCase: GetAllStatusUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const status = await this.getAllStatusUseCase.execute();
      return response.status(200).json({ status });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAllStatusUseCase {
  constructor(private statusRepository: StatusRepository) {}
  async execute() {
    return this.statusRepository.getAllStatus();
  }
}
