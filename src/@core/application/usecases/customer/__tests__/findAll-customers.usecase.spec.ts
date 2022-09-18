import { CreateCustomerUseCase, FindAllCustomersUseCase } from '..';
import { InMemoryCustomerRepository } from '../../../../infra/db/in-memory';

let customerRepository: InMemoryCustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let sut: FindAllCustomersUseCase;

describe('Find all customers use case', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    sut = new FindAllCustomersUseCase(customerRepository);
  });
  it('should be able to list customers', async () => {
    await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St',
    });

    await createCustomerUseCase.execute({
      name: 'Matheus Teixeira',
      email: 'teixeira@example.com',
      phone: '123456',
      address: '123 Main St',
    });

    expect(await sut.execute()).toHaveLength(2);
  });
});
