import { Manga } from '@domain/manga';
import { AnimeMangaUtils } from '@utils/AnimeManga';

export class DeleteMangaUseCase {
  constructor(private mangaUtils: AnimeMangaUtils<Manga>) {}
  async execute(name: string) {
    const result = await this.mangaUtils._delete(name);
    return result;
  }
}
