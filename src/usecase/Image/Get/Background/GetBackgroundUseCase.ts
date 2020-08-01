import { ImageRepository } from '@usecase/port/ImageRepository';

export class GetBackgroundUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute() {
    return await this.imageRepository.getBackground();
  }
}
