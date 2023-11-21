import { ReportRepository } from '@adapter/udesc/report/ReportRepository';
import { User } from '@domain/udesc/user';
import { Request, Response } from 'express';

export class UserLoginController {
  constructor(private userLoginUseCase: UserLoginUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body as User;
      const logged = await this.userLoginUseCase.execute({
        name,
        email,
        password,
      });
      return response.sendStatus(logged ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class UserLoginUseCase {
  constructor(private reportRepository: ReportRepository) {}
  async execute({ ...user }: User) {
    return this.reportRepository.userLogin(user);
  }
}
