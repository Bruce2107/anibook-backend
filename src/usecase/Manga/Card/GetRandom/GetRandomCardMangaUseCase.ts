import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Manga } from '@domain/manga';

export class GetRandomCardMangaUseCase {
  constructor(private mangaUtils: AnimeMangaUtils<Manga>) {}
  async execute(limit: string, order: string) {
    const result = await this.mangaUtils.getSortCard(limit, order);
    return result;
  }
}
