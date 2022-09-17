import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersRepository } from '../@core/infra/db/in-memory';
import { UserRepositoryInterface } from '../@core/domain/repositories';
import { CreateUserUseCase } from '../@core/application/usecases';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: InMemoryUsersRepository,
      useClass: InMemoryUsersRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (usersRepository: UserRepositoryInterface) => {
        return new CreateUserUseCase(usersRepository);
      },
      inject: [InMemoryUsersRepository],
    },
  ],
})
export class UsersModule {}
