import { StatusRepository } from '@adapter/udesc/status/StatusRepository';
import { Status } from '@domain/udesc/status';
import { Request, Response } from 'express';

export class UpdateStatusController {
  constructor(private updateStatusUseCase: UpdateStatusUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new Status(request.body);

      const status = await this.updateStatusUseCase.execute(id, data);

      return response.sendStatus(status ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateStatusUseCase {
  constructor(private statusRepository: StatusRepository) {}
  async execute(id: string, data: Status) {
    const result = await this.statusRepository.updateStatus(id, data);
    return result;
  }
}
