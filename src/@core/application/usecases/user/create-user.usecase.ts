import { User } from '../../../domain/entities';
import { UserRepositoryInterface } from '../../../domain/repositories';
import { HashHandler } from '../../../infra/gateways';

type UserDto = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export class CreateUserUseCase {
  constructor(private usersRepository: UserRepositoryInterface) {}

  async execute({ name, email, password }: UserDto) {
    const userExists = await this.usersRepository.findOneByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await new HashHandler().generate(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.usersRepository.create(user);

    return user;
  }
}
