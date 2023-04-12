import { StudioRepository } from '@adapter/udesc/studio/StudioRepository';
import { Request, Response } from 'express';

export class GetStudioController {
  constructor(private getStudioUseCase: GetStudioUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const studio = await this.getStudioUseCase.execute(id);

      if (!studio) return response.sendStatus(404);
      return response.status(200).json({ studio });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetStudioUseCase {
  constructor(private studioRepository: StudioRepository) {}
  async execute(id: string) {
    return this.studioRepository.getStudio(id);
  }
}
