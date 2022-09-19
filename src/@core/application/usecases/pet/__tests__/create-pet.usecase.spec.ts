import { CreatePetUseCase } from '..';
import {
  InMemoryCustomerRepository,
  InMemoryPetRepository,
} from '../../../../infra/db/in-memory';
import { CreateCustomerUseCase } from '../../customer';

let petRepository: InMemoryPetRepository;
let customerRepository: InMemoryCustomerRepository;
let createCustomerRepository: CreateCustomerUseCase;
let sut: CreatePetUseCase;

describe('Create pet use case', () => {
  beforeEach(() => {
    petRepository = InMemoryPetRepository.getInstance();
    petRepository.clear();
    customerRepository = InMemoryCustomerRepository.getInstance();
    customerRepository.clear();

    createCustomerRepository = new CreateCustomerUseCase(customerRepository);
    sut = new CreatePetUseCase(petRepository, customerRepository);
  });
  it('should throw an error if customer does not exist', async () => {
    await expect(
      sut.execute('invalid-id', {
        name: 'name',
        specie: 'dog',
        breed: 'breed',
      }),
    ).rejects.toThrowError('Customer does not exist.');
  });

  it('should be able to create a new pet', async () => {
    const customer = await createCustomerRepository.execute({
      name: 'John Doe',
      email: 'doe@example.com',
      phone: '123456',
      address: '123 Main St',
    });

    const pet = await sut.execute(customer.id, {
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
    });

    expect(pet).toHaveProperty('id');
    expect(pet).toHaveProperty('name', 'Apollo');
    expect(pet).toHaveProperty('specie', 'dog');
    expect(pet).toHaveProperty('breed', 'pitbull');
    expect(pet).toHaveProperty('ownerId', customer.id);
  });
});
