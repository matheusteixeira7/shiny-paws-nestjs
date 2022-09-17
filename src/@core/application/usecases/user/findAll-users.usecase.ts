import { UserRepositoryInterface } from '../../../domain/repositories';

export class FindAllUsersUseCase {
  constructor(private usersRepository: UserRepositoryInterface) {}

  async execute() {
    return this.usersRepository.findAll();
  }
}
