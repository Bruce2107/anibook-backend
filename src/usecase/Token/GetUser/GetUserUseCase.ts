import { UserRepository } from '@usecase/port/UserRepository';

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(nickname: string) {
    return this.userRepository.getOne(nickname);
  }
}
