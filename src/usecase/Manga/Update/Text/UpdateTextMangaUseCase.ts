import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Manga } from '@domain/manga';

export class UpdateTextMangaUseCase {
  constructor(private mangaUtils: AnimeMangaUtils<Manga>) {}
  async execute(name: string, data: Manga) {
    const result = await this.mangaUtils.updateAnyFieldsThatAreNotAFile(
      name,
      data
    );
    return result;
  }
}
