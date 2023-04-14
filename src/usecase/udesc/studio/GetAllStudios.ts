import { StudioRepository } from '@adapter/udesc/studio/StudioRepository';
import { Request, Response } from 'express';

export class GetAllStudiosController {
  constructor(private getAllStudiosUseCase: GetAllStudiosUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const studios = await this.getAllStudiosUseCase.execute();

      return response.status(200).json({ studios });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAllStudiosUseCase {
  constructor(private studioRepository: StudioRepository) {}
  async execute() {
    return this.studioRepository.getAllStudios();
  }
}
