import { inject, injectable } from 'tsyringe';

import { UserRepositoryInterface } from '../../../domain/repositories';

@injectable()
export class FindAllUsersUseCase {
  constructor(
    @inject('InMemoryUsersRepository')
    private usersRepository: UserRepositoryInterface,
  ) {}

  async execute() {
    return this.usersRepository.findAll();
  }
}
