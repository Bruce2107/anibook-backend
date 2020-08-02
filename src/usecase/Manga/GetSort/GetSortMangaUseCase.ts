import { Manga } from '@domain/manga';
import { AnimeMangaUtils } from '@utils/AnimeManga';

export class GetSortMangaUseCase {
  constructor(private mangaUtils: AnimeMangaUtils<Manga>) {}
  async execute(limit: string, sortField: string) {
    const result = await this.mangaUtils.getSort(limit, sortField);
    return result;
  }
}
