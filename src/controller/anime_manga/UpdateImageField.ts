import { Request, Response } from 'express';
import update from '../utils/UpdateImageFieldAnimeOrManga';

async function updateImageField(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const { name } = request.params;
    const { folder } = request.query;
    const files = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const table = request.path.split('/')[1];

    const status = await update(name, folder as string, files, table);
    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
}

export default updateImageField;
