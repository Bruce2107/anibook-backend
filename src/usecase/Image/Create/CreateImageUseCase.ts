import { ImageRepository } from '@usecase/port/ImageRepository';
import { saveImage } from '@utils/SaveImage';
import { Files } from '@constants/Files';

export class CreateImageUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(folder: string, files: Files) {
    return await saveImage(
      folder,
      this.imageRepository,
      undefined,
      files['images']
    );
  }
}
