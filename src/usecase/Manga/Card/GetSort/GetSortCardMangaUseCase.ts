import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Manga } from '@domain/manga';

export class GetSortCardMangaUseCase {
  constructor(private mangaUtils: AnimeMangaUtils<Manga>) {}
  async execute(limit: string, sortField: string) {
    const result = await this.mangaUtils.getSortCard(limit, sortField);
    return result;
  }
}
