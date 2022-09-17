import { FindOneUserUseCase } from '..';
import { User } from '../../../../domain/entities';
import { InMemoryUserRepository } from '../../../../infra/db/in-memory';

let usersRepository: InMemoryUserRepository;
let sut: FindOneUserUseCase;

describe('Get user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
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
    const user = User.create({
      name: 'Diego',
      email: 'asd@email.com',
      password: '123456',
    });

    await usersRepository.create(user);

    const result = await sut.execute({
      id: user.id,
    });

    expect(result).toEqual(user);
  });
});
