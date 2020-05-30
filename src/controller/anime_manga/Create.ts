import { Request, Response } from 'express';
import { Anime } from '../../constants/types/AnimeType';
import create from '../utils/CreateAnimeOrManga';

const createAnime = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const dados: Anime = JSON.parse(request.body.dados);
    const files = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const table = request.path.split('/')[1];
    const status = await create(
      request.query.folder as string,
      dados,
      files,
      table
    );
    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default createAnime;
