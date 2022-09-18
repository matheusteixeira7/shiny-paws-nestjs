import { CreateCustomerUseCase, RemoveCustomerUseCase } from '..';
import { InMemoryCustomerRepository } from '../../../../infra/db/in-memory';

let customerRepository: InMemoryCustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let sut: RemoveCustomerUseCase;

describe('Delete customer use case', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    sut = new RemoveCustomerUseCase(customerRepository);
  });
  it('should throw error if customer not found', async () => {
    await expect(
      sut.execute({
        id: '1',
      }),
    ).rejects.toThrowError('Customer not found');
  });

  it('should be able to delete a customer', async () => {
    const customer = await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St',
    });

    await sut.execute({
      id: customer.id,
    });

    expect(customerRepository.items).toHaveLength(0);
  });
});
