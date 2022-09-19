import { InMemoryUserRepository } from '../../../../infra/db/in-memory';
import { CreateUserUseCase, FindAllUsersUseCase } from '..';

let usersRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let sut: FindAllUsersUseCase;

describe('FindAllUsersUseCase', () => {
  beforeEach(() => {
    usersRepository = InMemoryUserRepository.getInstance();
    usersRepository.clear();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    sut = new FindAllUsersUseCase(usersRepository);
  });
  it('should be able to list users', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await createUserUseCase.execute({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '123456',
    });

    await expect(sut.execute()).resolves.toHaveLength(2);
  });
});
