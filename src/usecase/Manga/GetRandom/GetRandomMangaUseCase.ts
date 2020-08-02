import { Manga } from '@domain/manga';
import { AnimeMangaUtils } from '@utils/AnimeManga';

export class GetRandomMangaUseCase {
  constructor(private mangaUtils: AnimeMangaUtils<Manga>) {}
  async execute(limit: string) {
    const result = await this.mangaUtils.getRandom(limit);
    return result;
  }
}
