import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Anime } from '@domain/anime';

export class GetByNameCardAnimeUseCase {
  constructor(private animeUtils: AnimeMangaUtils<Anime>) {}
  async execute(limit: string) {
    const result = await this.animeUtils.getCard(limit);
    return result;
  }
}
