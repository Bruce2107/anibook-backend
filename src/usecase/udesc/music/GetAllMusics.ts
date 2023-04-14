import { MusicRepository } from '@adapter/udesc/music/MusicRepository';
import { Request, Response } from 'express';

export class GetAllMusicsController {
  constructor(private getAllMusicsUseCase: GetAllMusicsUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const musics = await this.getAllMusicsUseCase.execute();
      return response.status(200).json({ musics });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAllMusicsUseCase {
  constructor(private musicRepository: MusicRepository) {}
  async execute() {
    return this.musicRepository.getAllMusics();
  }
}
