import { StudioRepository } from '@adapter/udesc/studio/StudioRepository';
import { Studio } from '@domain/udesc/studio';
import { Request, Response } from 'express';

export class CreateStudioController {
  constructor(private createStudioUseCase: CreateStudioUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body as Studio;

      if (!name) return response.sendStatus(422);

      const result = await this.createStudioUseCase.execute(name);
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateStudioUseCase {
  constructor(private studioRepository: StudioRepository) {}
  async execute(name: string) {
    return await this.studioRepository.insertOne(new Studio({ name }));
  }
}
