import { Request, Response } from 'express';
import { MangaData } from 'src/constants/types/MangaType';
import getByName from '../utils/GetOneAnimeOrMangaByName';

const GetOneByName = async (
  request: Request,
  response: Response
): Promise<Response<MangaData>> => {
  try {
    const { name } = request.params;
    const result = await getByName(name, 'mangas');
    return response.status(result.status).json({ data: result.data?.dados });
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default GetOneByName;
