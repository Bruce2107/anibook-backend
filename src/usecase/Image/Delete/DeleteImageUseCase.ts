import { ImageRepository } from '@usecase/port/ImageRepository';

export class DeleteImageUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(folder: string, name: string) {
    return this.imageRepository._delete(folder, name);
  }
}
