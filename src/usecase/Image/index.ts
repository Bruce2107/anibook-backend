import { Request, Response } from 'express';
import { saveImage } from '@utils/SaveImage';
import { ImageControllerRepository } from '@usecase/port/ImageControllerRepository';
import { DatabaseImage } from '@adapter/image/repository/DatabaseImage';

export class ImageController implements ImageControllerRepository {
  async insertImage(request: Request, response: Response): Promise<Response> {
    try {
      const queryFolder = request.query.folder as string;
      const files = request.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      if (!files) return response.sendStatus(422);

      const folder = queryFolder ? queryFolder : 'background';

      return (await saveImage(
        folder,
        new DatabaseImage(),
        undefined,
        files['images']
      ))
        ? response.sendStatus(201)
        : response.sendStatus(400);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async deleteImage(request: Request, response: Response): Promise<Response> {
    const imageAdapter = new DatabaseImage();
    try {
      const { folder, name } = request.params;

      return (await imageAdapter._delete(folder, name))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getBackground(_: Request, response: Response): Promise<Response> {
    const imageAdapter = new DatabaseImage();
    try {
      const randomRow = await imageAdapter.getBackground();
      if (!randomRow) return response.sendStatus(404);
      response.contentType(randomRow.contentType);
      return response.send(randomRow.image);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }

  async getImage(request: Request, response: Response): Promise<Response> {
    const imageAdapter = new DatabaseImage();
    try {
      const { folder, name } = request.params;

      const result = await imageAdapter.getOne(folder, name);
      if (result) {
        response.contentType(result.contentType);
        return response.send(result.image);
      }
      return response.sendStatus(404);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
}

const databaseImageRepository = new DatabaseImage();

export { databaseImageRepository };
