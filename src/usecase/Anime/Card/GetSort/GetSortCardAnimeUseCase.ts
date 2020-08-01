import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Anime } from '@domain/anime';

export class GetSortCardAnimeUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Anime>) {}
  async execute(limit: string) {
    const result = await this.animeUtils.getRandomCards(limit);
    return result;
  }
}