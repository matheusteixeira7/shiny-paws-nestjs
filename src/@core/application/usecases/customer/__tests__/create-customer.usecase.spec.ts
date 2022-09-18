import { CreateCustomerUseCase } from '..';
import { InMemoryCustomerRepository } from '../../../../infra/db/in-memory';

let customerRepository: InMemoryCustomerRepository;
let sut: CreateCustomerUseCase;

describe('Create customer use case', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
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
      name: 'John Doe',
      email: 'john@example.com',
      phone: '2499999-9999',
      address: '123 Main St',
    });

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('John Doe');
    expect(customer.email).toBe('john@example.com');
    expect(customer.phone).toBe('2499999-9999');
    expect(customer.address).toBe('123 Main St');
  });
});
