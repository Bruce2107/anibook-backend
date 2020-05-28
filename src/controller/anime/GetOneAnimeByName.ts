import { Request, Response } from 'express';
import { AnimeData } from 'src/constants/types/AnimeType';
import getByName from '../utils/GetOneAnimeOrMangaByName';

const GetOneByName = async (
  request: Request,
  response: Response
): Promise<Response<AnimeData>> => {
  try {
    const { name } = request.params;
    const result = await getByName(name, 'animes');
    return response.status(result.status).json({ data: result.data?.dados });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default GetOneByName;
