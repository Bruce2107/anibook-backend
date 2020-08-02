import { Anime } from '@domain/anime';
import { AnimeMangaUtils } from '@utils/AnimeManga';

export class GetRandomAnimeUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Anime>) {}
  async execute(limit: string) {
    const result = await this.animeUtils.getRandom(limit);
    return result;
  }
}
