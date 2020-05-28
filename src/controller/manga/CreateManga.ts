import { Request, Response } from 'express';
import { Manga } from '../../constants/types/MangaType';
import create from '../utils/CreateAnimeOrManga';

const createManga = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const dados: Manga = JSON.parse(request.body.dados);
    const files = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const status = await create(
      request.query.folder as string,
      dados,
      files,
      'mangas'
    );

    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default createManga;
