import { CreateCustomerUseCase, UpdateCustomerUseCase } from '..';
import { InMemoryCustomerRepository } from '../../../../infra/db/in-memory';

let customerRepository: InMemoryCustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let sut: UpdateCustomerUseCase;

describe('Update customer use case', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    sut = new UpdateCustomerUseCase(customerRepository);
  });
  it('should throw error if customer not found', async () => {
    await expect(
      sut.execute('1', {
        name: 'Matheus Teixeira',
        email: 'teixeira@email.com',
        phone: '2499999-9999',
        address: '123 Main St',
      }),
    ).rejects.toThrowError('Customer not found');
  });

  it('should be able to update customer name', async () => {
    const customer = await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '2499999-9999',
      address: '123 Main St',
    });

    const result = await sut.execute(customer.id, {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '2488888-8888',
      address: '321 Main St',
    });

    expect(result.name).toEqual('Jane Doe');
    expect(result.email).toEqual('jane@example.com');
    expect(result.phone).toEqual('2488888-8888');
    expect(result.address).toEqual('321 Main St');
  });
});
