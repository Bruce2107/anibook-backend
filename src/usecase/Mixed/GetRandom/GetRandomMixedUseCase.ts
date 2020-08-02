import { mergeArray, limits as getLimit } from 'anibook';
import { AnimeMangaUtils } from '@utils/AnimeManga';
import { Anime } from '@domain/anime';
import { Manga } from '@domain/manga';
import { MyAnime, MyManga, Mixed } from '..';

export class GetRandomMixedUseCase {
  constructor(
    private animeUtils: AnimeMangaUtils<Anime>,
    private mangaUtils: AnimeMangaUtils<Manga>
  ) {}
  async execute(limit: string) {
    const { limitAnime, limitManga } = getLimit(Number(limit as string));

    const resultAnime = await this.animeUtils.getRandom(String(limitAnime));
    const resultManga = await this.mangaUtils.getRandom(String(limitManga));

    let animes: MyAnime[] = [];
    let mangas: MyManga[] = [];
    if (resultAnime.data) {
      animes = resultAnime.data.map((anime) => ({ ...anime, type: 'anime' }));
    }
    if (resultManga.data) {
      mangas = resultManga.data.map((anime) => ({ ...anime, type: 'manga' }));
    }
    return mergeArray(animes as Mixed[], mangas as Mixed[]);
  }
}
