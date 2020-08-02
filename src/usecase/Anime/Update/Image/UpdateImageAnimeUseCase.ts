import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Anime } from '@domain/anime';
import { Files } from '@constants/Files';

export class UpdateImageAnimeUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Anime>) {}
  async execute(name: string, folder: string, files: Files) {
    const result = await this.animeUtils.updateImageFields(name, folder, files);
    return result;
  }
}
