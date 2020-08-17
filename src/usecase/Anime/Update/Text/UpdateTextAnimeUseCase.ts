import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Anime } from '@domain/anime';

export class UpdateTextAnimeUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Anime>) {}
  async execute(name: string, data: Anime) {
    const result = await this.animeUtils.updateAnyFieldsThatAreNotAFile(
      name,
      data
    );
    return result;
  }
}
