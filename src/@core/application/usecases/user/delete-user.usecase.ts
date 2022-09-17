import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../../domain/repositories';

type UserProps = {
  id: string;
};

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('InMemoryUsersRepository')
    private usersRepository: UserRepositoryInterface,
  ) {}

  async execute({ id }: UserProps) {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new Error('User not found');
    }

    this.usersRepository.delete(id);
  }
}
