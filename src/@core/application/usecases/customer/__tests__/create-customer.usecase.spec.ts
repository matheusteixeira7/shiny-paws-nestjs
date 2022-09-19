import { CreateCustomerUseCase } from '..';
import { InMemoryCustomerRepository } from '../../../../infra/db/in-memory';

const myMock = jest.fn();

let customerRepository: InMemoryCustomerRepository;
let sut: CreateCustomerUseCase;

describe('Create customer use case', () => {
  beforeEach(() => {
    customerRepository = InMemoryCustomerRepository.getInstance();
    sut = new CreateCustomerUseCase(customerRepository);
  });
  it('should throw error if customer already exists', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '2499999-9999',
      address: '123 Main St',
    });

    await expect(
      sut.execute({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '2499999-9999',
        address: '123 Main St',
      }),
    ).rejects.toThrowError('Customer already exists');
  });

  it('should be able to create a new user', async () => {
    const customer = await sut.execute({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '2499999-9999',
      address: '123 Main St',
    });

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('Jane Doe');
    expect(customer.email).toBe('jane@example.com');
    expect(customer.phone).toBe('2499999-9999');
    expect(customer.address).toBe('123 Main St');
  });
});
