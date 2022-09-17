import { container } from 'tsyringe';

import { UserRepositoryInterface } from '../../domain/repositories/user.repository';
import { InMemoryUsersRepository } from '../db/in-memory/in-memory-user.repository';

container.registerSingleton<UserRepositoryInterface>(
  'InMemoryUsersRepository',
  InMemoryUsersRepository,
);
