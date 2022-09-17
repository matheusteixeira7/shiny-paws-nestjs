import { User } from '../../../../domain/entities';
import { InMemoryUserRepository } from '../../../../infra/db/in-memory';
import { FindAllUsersUseCase } from '..';

let usersRepository: InMemoryUserRepository;
let sut: FindAllUsersUseCase;

describe('List user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new FindAllUsersUseCase(usersRepository);
  });
  it('should be able to list users', async () => {
    const user1 = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456',
    });

    const user2 = User.create({
      name: 'Matheus',
      email: 'doe@example.com',
      password: '123456',
    });

    await usersRepository.create(user1);
    await usersRepository.create(user2);

    const users = await sut.execute();

    expect(users).toHaveLength(2);
  });
});
