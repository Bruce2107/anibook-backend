import { Request, Response } from 'express';
import { Card } from '../../constants/Card';
import getRandomCard from '../utils/GetRandomAnimeOrMangaCard';

async function GetRandomCardInformations(
  request: Request,
  response: Response
): Promise<Response<Array<Card>>> {
  try {
    const { limit } = request.query;
    const table = request.path.split('/')[1];

    const result = await getRandomCard<Card>(limit as string, table);
    return response
      .status(result.status)
      .json({ data: result.data, rows: result.rows });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default GetRandomCardInformations;
