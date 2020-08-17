import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Manga } from '@domain/manga';

export class GetByNameCardMangaUseCase {
  constructor(private mangaUtils: AnimeMangaUtils<Manga>) {}
  async execute(limit: string) {
    const result = await this.mangaUtils.getCard(limit);
    return result;
  }
}
