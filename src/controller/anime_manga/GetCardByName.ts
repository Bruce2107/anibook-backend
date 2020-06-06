import { Request, Response } from 'express';
import { Card } from 'anibook';
import getCardInfo from '../utils/GetCardInformationsAnimeOrMangaByName';

async function getCardInformtionsByName(
  request: Request,
  response: Response
): Promise<Response<Card>> {
  try {
    const { name } = request.params;
    
    // Get the database table from path request
    const table = request.path.split('/')[1];

    const result = await getCardInfo<Card>(name, table);
    return response.status(result.status).json({ data: result.data });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default getCardInformtionsByName;
