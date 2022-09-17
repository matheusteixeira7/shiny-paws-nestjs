import { User } from '../../../../domain/entities';
import { InMemoryUserRepository } from '../../../../infra/db/in-memory';
import { CreateUserUseCase } from '../';

let usersRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;

describe('Create user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(usersRepository);
  });
  it('should throw error if user already exists', async () => {
    const user = User.create({
      name: 'Diego',
      email: 'doe@example.com',
      password: '123456',
    });

    usersRepository.items.push(user);

    await expect(
      sut.execute({
        name: 'Diego',
        email: 'doe@example.com',
        password: '123456',
      }),
    ).rejects.toThrowError('User already exists');
  });

  it('should be able to create a new user', async () => {
    const user = await sut.execute({
      name: 'Diego',
      email: 'asd@email.com',
      password: '123456',
    });

    expect(user).toBeInstanceOf(User);
  });
});
