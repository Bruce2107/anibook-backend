import { MusicRepository } from '@adapter/udesc/music/MusicRepository';
import { Music } from '@domain/udesc/music';
import { Request, Response } from 'express';

export class UpdateMusicController {
  constructor(private updateMusicUseCase: UpdateMusicUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new Music(request.body);

      const status = await this.updateMusicUseCase.execute(id, data);

      return response.sendStatus(status ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateMusicUseCase {
  constructor(private musicRepository: MusicRepository) {}
  async execute(id: string, data: Music) {
    const result = await this.musicRepository.updateMusic(id, data);
    return result;
  }
}
