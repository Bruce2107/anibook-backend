import { Request, Response } from 'express';
import Iimage from './Image';
import saveImage from '../../utils/SaveImageOnDatabase';
import {
  _delete,
  get,
  getBackground as getBackgroundDatabase,
} from '../../database/image';

class _Image implements Iimage {
  async createImage(request: Request, response: Response): Promise<Response> {
    try {
      const queryFolder = request.query.folder as string;
      const files = request.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      if (!files) return response.sendStatus(422);

      const folder = queryFolder ? queryFolder : 'background';

      return (await saveImage(folder, undefined, files['images']))
        ? response.sendStatus(201)
        : response.sendStatus(400);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async deleteImage(request: Request, response: Response): Promise<Response> {
    try {
      const { folder, name } = request.params;

      return (await _delete(folder, name))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getBackground(_: Request, response: Response): Promise<Response> {
    try {
      const randomRow = await getBackgroundDatabase();
      if (!randomRow.rowCount) return response.sendStatus(404);
      response.contentType(randomRow.rows[0].contentType);
      return response.send(randomRow.rows[0].image);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getImage(request: Request, response: Response): Promise<Response> {
    try {
      const { folder, name } = request.params;

      const result = await get(folder, name);
      if (result.rowCount) {
        response.contentType(result.rows[0].contentType);
        return response.send(result.rows[0].image);
      }
      return response.sendStatus(404);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
}

export default new _Image();
