import { Request, Response } from 'express';
import { Files } from '@constants/Files';
import { ImageRelationalRepository } from '@adapter/udesc/image/ImageRelationalRepository';
import { MakeAConvertedImage } from '@utils/MakeAConvertedImage';
import { TypeImage } from 'anibook';

export class UpdateImageController {
  constructor(private updateImageUseCase: UpdateImageUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const queryFolder = request.query.folder as string;
      const files = request.files as Files;
      const { id } = request.params;
      if (!files) return response.sendStatus(422);

      const folder = queryFolder ? queryFolder : 'background';

      return (await this.updateImageUseCase.execute(folder, files, id))
        ? response.sendStatus(204)
        : response.sendStatus(400);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateImageUseCase {
  constructor(private imageRepository: ImageRelationalRepository) {}

  async execute(folder: string, files: Files, id: string) {
    return await saveImage(
      folder,
      this.imageRepository,
      id,
      files['images'][0]
    );
  }
}

async function saveImage(
  folder: string,
  adapter: ImageRelationalRepository,
  id: string,
  file?: Express.Multer.File,
  files?: Express.Multer.File[]
) {
  if (file) {
    const image = await MakeAConvertedImage(folder, file);
    if (!(await adapter.updateImage(id, image))) return false;
  }
  if (files) {
    const images: Array<TypeImage> = [];
    for await (let file of files) {
      const image = await MakeAConvertedImage(folder, file);
      if (!(await adapter.alreadyExists(folder, image.name)))
        images.push(image);
    }
    if (images.length > 0) await adapter.insertMany(images);
  }
  return true;
}
