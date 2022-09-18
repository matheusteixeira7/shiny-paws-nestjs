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
    await sut.execute({
      name: 'John Doe',
      email: 'doe@example.com',
      password: '123456',
    });

    await expect(
      sut.execute({
        name: 'John Doe',
        email: 'doe@example.com',
        password: '123456',
      }),
    ).rejects.toThrowError('User already exists');
  });

  it('should be able to create a new user', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
});
