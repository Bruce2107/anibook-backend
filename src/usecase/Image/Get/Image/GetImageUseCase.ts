import { ImageRepository } from '@usecase/port/ImageRepository';

export class GetImageUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(folder: string, name: string) {
    return await this.imageRepository.getOne(folder, name);
  }
}
