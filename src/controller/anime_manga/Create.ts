import { Request, Response } from 'express';
import { Data } from 'anibook';
import createAnimeOrManga from '../utils/CreateAnimeOrManga';

async function create<T extends Data>(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const dados: T = JSON.parse(request.body.dados);
    const files = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    // Get the database table from path request
    const table = request.path.split('/')[1];
    const status = await createAnimeOrManga(
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

export default create;
