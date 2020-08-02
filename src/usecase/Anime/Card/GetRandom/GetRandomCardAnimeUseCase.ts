import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Anime } from '@domain/anime';

export class GetRandomCardAnimeUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Anime>) {}
  async execute(limit: string, order: string) {
    const result = await this.animeUtils.getSortCard(limit, order);
    return result;
  }
}
