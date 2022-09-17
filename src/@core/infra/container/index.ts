import { container } from 'tsyringe';

import { UserRepositoryInterface } from '../../domain/repositories/user.repository';
import { InMemoryUserRepository } from '../db/in-memory/in-memory-user.repository';

container.registerSingleton<UserRepositoryInterface>(
  'InMemoryUsersRepository',
  InMemoryUserRepository,
);
