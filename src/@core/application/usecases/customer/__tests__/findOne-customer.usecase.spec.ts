import { CreateCustomerUseCase, FindOneCustomerUseCase } from '..';
import { InMemoryCustomerRepository } from '../../../../infra/db/in-memory';

let customerRepository: InMemoryCustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let sut: FindOneCustomerUseCase;

describe('Find one customer use case', () => {
  beforeEach(() => {
    customerRepository = InMemoryCustomerRepository.getInstance();
    createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    sut = new FindOneCustomerUseCase(customerRepository);
  });
  it('should throw error if customer do not exists', async () => {
    await expect(
      sut.execute({
        id: '1',
      }),
    ).rejects.toThrowError('Customer not found');
  });

  it('should be able to get a customer', async () => {
    const customer = await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St',
    });

    await expect(sut.execute({ id: customer.id })).resolves.toEqual(customer);
  });
});
