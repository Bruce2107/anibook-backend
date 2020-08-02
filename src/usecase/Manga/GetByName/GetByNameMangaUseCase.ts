import { Manga } from '@domain/manga';
import { AnimeMangaUtils } from '@utils/AnimeManga';

export class GetByNameMangaUseCase {
  constructor(private mangaUtils: AnimeMangaUtils<Manga>) {}
  async execute(name: string) {
    const result = await this.mangaUtils.getOne(name);
    return result;
  }
}
