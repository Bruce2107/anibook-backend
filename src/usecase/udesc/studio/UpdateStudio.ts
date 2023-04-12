import { StudioRepository } from '@adapter/udesc/studio/StudioRepository';
import { Studio } from '@domain/udesc/studio';
import { Request, Response } from 'express';

export class UpdateStudioController {
  constructor(private updateStudioUseCase: UpdateStudioUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new Studio(request.body);

      const studio = await this.updateStudioUseCase.execute(id, data);

      return response.sendStatus(studio ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateStudioUseCase {
  constructor(private studioRepository: StudioRepository) {}
  async execute(id: string, data: Studio) {
    const result = await this.studioRepository.updateStudio(id, data);
    return result;
  }
}
