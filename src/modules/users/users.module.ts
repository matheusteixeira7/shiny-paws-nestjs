import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { InMemoryUserRepository } from '../../@core/infra/db/in-memory';
import { UserRepositoryInterface } from '../../@core/domain/repositories';
import {
  CreateUserUseCase,
  RemoveUserUseCase,
  FindAllUsersUseCase,
  FindOneUserUseCase,
  UpdateUserUseCase,
} from '../../@core/application/usecases/user';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: InMemoryUserRepository,
      useValue: InMemoryUserRepository.getInstance(),
    },
    {
      provide: CreateUserUseCase,
      useFactory: (usersRepository: UserRepositoryInterface) => {
        return new CreateUserUseCase(usersRepository);
      },
      inject: [InMemoryUserRepository],
    },
    {
      provide: FindAllUsersUseCase,
      useFactory: (usersRepository: UserRepositoryInterface) => {
        return new FindAllUsersUseCase(usersRepository);
      },
      inject: [InMemoryUserRepository],
    },
    {
      provide: FindOneUserUseCase,
      useFactory: (usersRepository: UserRepositoryInterface) => {
        return new FindOneUserUseCase(usersRepository);
      },
      inject: [InMemoryUserRepository],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (usersRepository: UserRepositoryInterface) => {
        return new UpdateUserUseCase(usersRepository);
      },
      inject: [InMemoryUserRepository],
    },
    {
      provide: RemoveUserUseCase,
      useFactory: (usersRepository: UserRepositoryInterface) => {
        return new RemoveUserUseCase(usersRepository);
      },
      inject: [InMemoryUserRepository],
    },
  ],
})
export class UsersModule {}
