import { mergeArray, limits as getLimit } from 'anibook';
import { Anime } from '@domain/anime';
import { Manga } from '@domain/manga';
import { AnimeMangaUtils } from '@utils/AnimeManga';
import { MyAnime, MyManga, MyCard } from '@usecase/Mixed';

export class GetRandomCardMixedUseCase {
  constructor(
    private animeUtils: AnimeMangaUtils<Anime>,
    private mangaUtils: AnimeMangaUtils<Manga>
  ) {}
  async execute(limit: string) {
    const { limitAnime, limitManga } = getLimit(Number(limit as string));

    const resultAnime = await this.animeUtils.getRandomCards(
      String(limitAnime)
    );
    const resultManga = await this.mangaUtils.getRandomCards(
      String(limitManga)
    );

    let animes: MyAnime[] = [];
    let mangas: MyManga[] = [];
    if (resultAnime.data) {
      animes = resultAnime.data.map((anime) => ({ ...anime, type: 'anime' }));
    }
    if (resultManga.data) {
      mangas = resultManga.data.map((anime) => ({ ...anime, type: 'manga' }));
    }
    return mergeArray(animes as MyCard[], mangas as MyCard[]);
  }
}
