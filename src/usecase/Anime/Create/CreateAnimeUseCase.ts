import { Anime } from '@domain/anime';
import { Files } from '@constants/Files';
import { AnimeMangaUtils } from '@utils/AnimeManga';

export class CreateAnimeUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Anime>) {}
  async execute(data: Anime, files: Files, folder: string) {
    return await this.animeUtils.create(folder, data, files);
  }
}
