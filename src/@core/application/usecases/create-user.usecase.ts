import { inject, injectable } from 'tsyringe';

import { User } from '../../domain/entities/users.entity';
import { HashHandler } from '../../infra/gateways/hash-handler';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository';

type UserProps = {
  name: string;
  email: string;
  password: string;
};

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('InMemoryUsersRepository')
    private usersRepository: UserRepositoryInterface,
  ) {}

  async execute({ name, email, password }: UserProps) {
    const user = await this.usersRepository.findOneByEmail(email);

    if (user) {
      throw new Error('User already exists');
    }

    const hashedPassword = await new HashHandler().generate(password);

    const newUser = User.create({
      name,
      email,
      password: hashedPassword,
    });

    this.usersRepository.create(newUser);

    return newUser;
  }
}
