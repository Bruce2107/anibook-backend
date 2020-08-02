import { UserRepository } from '@usecase/port/UserRepository';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(email: string, nickname: string) {
    return await this.userRepository.insertOne(email, nickname);
  }
}
