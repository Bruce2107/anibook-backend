import { Request, Response } from 'express';
import { Anime, AnimeData } from '../../constants/types/AnimeType';
import getByName from '../utils/GetOneAnimeOrMangaByName';

const GetOneByName = async (
  request: Request,
  response: Response
): Promise<Response<Anime>> => {
  try {
    const { name } = request.params;
    const table = request.path.split('/')[1];

    const result = await getByName<AnimeData>(name, table);
    return response.status(result.status).json({ data: result.data?.dados });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default GetOneByName;