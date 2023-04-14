import { StreamingRepository } from '@adapter/udesc/streaming/StreamingRepository';
import { Request, Response } from 'express';

export class GetAllStreamingsController {
  constructor(private getAllStreamingsUseCase: GetAllStreamingsUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const streamings = await this.getAllStreamingsUseCase.execute();

      return response.status(200).json({ streamings });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAllStreamingsUseCase {
  constructor(private streamingRepository: StreamingRepository) {}
  async execute() {
    return this.streamingRepository.getAllStreamings();
  }
}
