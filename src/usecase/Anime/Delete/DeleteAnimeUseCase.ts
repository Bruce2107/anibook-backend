import { Anime } from '@domain/anime';
import { AnimeMangaUtils } from '@utils/AnimeManga';

export class DeleteAnimeUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Anime>) {}
  async execute(name: string) {
    const result = await this.animeUtils._delete(name);
    return result;
  }
}
