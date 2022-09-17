import { UserRepositoryInterface } from '../../../domain/repositories';

type UserProps = {
  id: string;
};

export class DeleteUserUseCase {
  constructor(private usersRepository: UserRepositoryInterface) {}

  async execute({ id }: UserProps) {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new Error('User not found');
    }

    this.usersRepository.delete(id);
  }
}
