import { Request, Response } from 'express';
import update from '../utils/UpdateImageFieldAnimeOrManga';

const updateImageField = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { name } = request.params;
    const { folder } = request.query;
    const files = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const status = await update(name, folder as string, files, 'animes');
    return response.sendStatus(status);
  } catch (error) {
    return response.status(400).send({ error: error.stack });
  }
};

export default updateImageField;
