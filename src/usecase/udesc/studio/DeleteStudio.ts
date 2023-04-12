import { StudioRepository } from '@adapter/udesc/studio/StudioRepository';
import { Request, Response } from 'express';

export class DeleteStudioController {
  constructor(private deleteStudioUseCase: DeleteStudioUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteStudioUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteStudioUseCase {
  constructor(private studioRepository: StudioRepository) {}

  async execute(id: string) {
    return this.studioRepository._delete(id);
  }
}
