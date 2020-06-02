import { Request, Response } from 'express';
import { Data } from 'anibook';
import create from '../utils/CreateAnimeOrManga';

async function createAnime<T extends Data>(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const dados: T = JSON.parse(request.body.dados);
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
}

export default createAnime;
