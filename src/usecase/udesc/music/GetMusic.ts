import { MusicRepository } from '@adapter/udesc/music/MusicRepository';
import { Request, Response } from 'express';

export class GetMusicController {
  constructor(private getMusicUseCase: GetMusicUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const music = await this.getMusicUseCase.execute(id);

      if (!music) return response.sendStatus(404);
      return response.status(200).json({ music });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetMusicUseCase {
  constructor(private musicRepository: MusicRepository) {}
  async execute(id: string) {
    return isNaN(Number(id))
      ? this.musicRepository.getMusic(id)
      : this.musicRepository.getMusicById(id);
  }
}
