import { StatusRepository } from '@adapter/udesc/status/StatusRepository';
import { Request, Response } from 'express';

export class DeleteStatusController {
  constructor(private deleteStatusUseCase: DeleteStatusUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteStatusUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteStatusUseCase {
  constructor(private statusRepository: StatusRepository) {}

  async execute(id: string) {
    return this.statusRepository._delete(id);
  }
}
