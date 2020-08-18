import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Anime } from '@domain/anime';

export class GetSortCardAnimeUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Anime>) {}
  async execute(limit: string, sortField: string) {
    const result = await this.animeUtils.getSortCard(limit, sortField);
    return result;
  }
}
