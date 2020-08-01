import { Anime } from '@domain/anime';
import { AnimeMangaUtils } from '@utils/AnimeManga';

export class GetSortAnimeUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Anime>) {}
  async execute(limit: string, sortField: string) {
    const result = await this.animeUtils.getSort(limit, sortField);
    return result;
  }
}
