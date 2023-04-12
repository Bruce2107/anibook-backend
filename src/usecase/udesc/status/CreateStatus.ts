import { StatusRepository } from '@adapter/udesc/status/StatusRepository';
import { Status } from '@domain/udesc/status';
import { Request, Response } from 'express';

export class CreateStatusController {
  constructor(private createStatusUseCase: CreateStatusUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { value } = request.body as Status;

      if (!value) return response.sendStatus(422);

      const result = await this.createStatusUseCase.execute(value);
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateStatusUseCase {
  constructor(private statusRepository: StatusRepository) {}
  async execute(value: string) {
    return await this.statusRepository.insertOne(new Status({ value }));
  }
}
