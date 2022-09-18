import { CreateUserUseCase, FindOneUserUseCase } from '..';
import { InMemoryUserRepository } from '../../../../infra/db/in-memory';

let usersRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let sut: FindOneUserUseCase;

describe('FindOneUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    sut = new FindOneUserUseCase(usersRepository);
  });
  it('should throw error if user do not exists', async () => {
    await expect(
      sut.execute({
        id: '1',
      }),
    ).rejects.toThrowError('User not found');
  });

  it('should be able to get an user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const result = await sut.execute({
      id: user.id,
    });

    expect(result).toEqual(user);
  });
});
