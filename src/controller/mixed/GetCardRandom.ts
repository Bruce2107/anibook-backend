import { Request, Response } from 'express';
import { Card, mergeArray, limits as getLimit } from 'anibook';
import getRandomCard from '../utils/GetRandomAnimeOrMangaCard';

async function getCardRandom(request: Request, response: Response) {
  try {
    const { limit } = request.query;

    const { limitAnime, limitManga } = getLimit(Number(limit as string));

    const resultAnime = await getRandomCard<Card>(String(limitAnime), 'animes');
    const resultManga = await getRandomCard<Card>(String(limitManga), 'mangas');
    const resultMerged = mergeArray(
      resultAnime.data as Card[],
      resultManga.data as Card[]
    );

    return response
      .status(200)
      .json({ data: resultMerged, rows: resultMerged.length });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default getCardRandom;
