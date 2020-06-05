import { Request, Response } from 'express';
import { Data, mergeArray, limits as getLimit } from 'anibook';
import getRandomData from '../utils/GetAllAnimesOrManga';

async function getRandom<T extends Data>(request: Request, response: Response) {
  try {
    const { limit } = request.query;

    const { limitAnime, limitManga } = getLimit(Number(limit as string));

    const resultAnime = await getRandomData<T>(String(limitAnime), 'animes');
    const resultManga = await getRandomData<T>(String(limitManga), 'mangas');
    const resultMerged = mergeArray(
      resultAnime.data as [],
      resultManga.data as []
    );

    return response
      .status(200)
      .json({ data: resultMerged, rows: resultMerged.length });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default getRandom;
