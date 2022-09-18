import { User } from '../../../../domain/entities';
import { InMemoryUserRepository } from '../../../../infra/db/in-memory';
import { RemoveUserUseCase } from '../';

let usersRepository: InMemoryUserRepository;
let sut: RemoveUserUseCase;

describe('Delete user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RemoveUserUseCase(usersRepository);
  });
  it('should throw error if user not found exists', async () => {
    await expect(
      sut.execute({
        id: '1',
      }),
    ).rejects.toThrowError('User not found');
  });

  it('should be able to delete a user', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'doe@example.com',
      password: '123456',
    });

    await usersRepository.create(user);

    await sut.execute({
      id: user.id,
    });

    expect(usersRepository.items).toHaveLength(0);
  });
});
