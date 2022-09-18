import { InMemoryUserRepository } from '../../../../infra/db/in-memory';
import { CreateUserUseCase, UpdateUserUseCase } from '..';

let usersRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let sut: UpdateUserUseCase;

describe('UpdateUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    sut = new UpdateUserUseCase(usersRepository);
  });

  it('should should throw error if user is not found', async () => {
    const dto = {
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456',
    };

    await expect(sut.execute('1', dto)).rejects.toThrowError('User not found');
  });

  it('should throw error if email is already in use', async () => {
    const dto = {
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456',
    };

    const dto2 = {
      name: 'Jane Doe',
      email: 'jane@email.com',
      password: '123456',
    };

    const user = await createUserUseCase.execute(dto);
    await createUserUseCase.execute(dto2);

    await expect(sut.execute(user.id, dto2)).rejects.toThrowError(
      'E-mail already in use',
    );
  });

  it('should throw error if old password is not provided', async () => {
    const dto = {
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456',
    };

    const user = await createUserUseCase.execute(dto);

    await expect(
      sut.execute(user.id, {
        name: 'John Doe',
        email: 'doe@email.com',
        password: '123456',
      }),
    ).rejects.toThrowError('Old password is required');
  });

  it('should throw error if old password does not match', async () => {
    const dto = {
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456',
    };

    const user = await createUserUseCase.execute(dto);

    await expect(
      sut.execute(user.id, {
        name: 'John Doe',
        email: 'doe@email.com',
        password: '123456',
        oldPassword: '1234567',
      }),
    ).rejects.toThrowError('Old password does not match');
  });

  it('should update user', async () => {
    const dto = {
      name: 'John Doe',
      email: 'doe@email.com',
      password: '123456',
    };

    const user = await createUserUseCase.execute(dto);

    const oldPassword = user.password;

    const result = await sut.execute(user.id, {
      name: 'Jane Doe',
      email: 'jane.doe@email.com',
      avatar: 'avatar.jpg',
      password: '654321',
      oldPassword: '123456',
    });

    expect(result).toHaveProperty('id');
    expect(result.name).toBe('Jane Doe');
    expect(result.email).toBe('jane.doe@email.com');
    expect(result.avatar).toBe('avatar.jpg');
    expect(result.password).not.toBe(oldPassword);
  });
});
