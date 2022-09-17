import { inject, injectable } from 'tsyringe';
import { User } from '../../../domain/entities';
import { UserRepositoryInterface } from '../../../domain/repositories';
import { HashHandler } from '../../../infra/gateways';

type UserProps = {
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  oldPassword?: string;
};

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('InMemoryUsersRepository')
    private usersRepository: UserRepositoryInterface,
  ) {}

  async execute(
    id: string,
    { name, email, password, avatar, oldPassword }: UserProps,
  ) {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const userUpdateEmail = await this.usersRepository.findOneByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new Error('E-mail already in use');
    }

    if (password && !oldPassword) {
      throw new Error('Old password is required');
    }

    if (password && oldPassword) {
      const checkOldPassword = await new HashHandler().compare(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new Error('Old password does not match');
      }

      Object.assign(user, {
        ...user,
        password: await new HashHandler().generate(password),
      });
    }

    if (avatar) {
      Object.assign(user, {
        ...user,
        avatar,
      });
    }

    const updatedUser = User.update(
      {
        name,
        email,
        password: user.password,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: new Date(),
      },
      user.id,
    );

    this.usersRepository.update(updatedUser);

    return updatedUser;
  }
}
