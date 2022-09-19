import { CreatePetUseCase, FindOnePetUseCase } from '..';
import {
  InMemoryCustomerRepository,
  InMemoryPetRepository,
} from '../../../../infra/db/in-memory';
import { CreateCustomerUseCase } from '../../customer';

let petRepository: InMemoryPetRepository;
let customerRepository: InMemoryCustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let createPetUseCase: CreatePetUseCase;
let sut: FindOnePetUseCase;

describe('Get pet use case', () => {
  beforeEach(() => {
    petRepository = InMemoryPetRepository.getInstance();
    petRepository.clear();

    customerRepository = InMemoryCustomerRepository.getInstance();
    customerRepository.clear();

    createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    createPetUseCase = new CreatePetUseCase(petRepository, customerRepository);

    sut = new FindOnePetUseCase(petRepository);
  });
  it('should throw error if pet do not exists', async () => {
    await expect(sut.execute('invalid_id')).rejects.toThrowError(
      'Pet not found',
    );
  });

  it('should be able to find a pet', async () => {
    const customer = await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '2499999-9999',
      address: '123 Main St',
    });

    const pet = await createPetUseCase.execute(customer.id, {
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
    });

    await expect(sut.execute(pet.id)).resolves.toEqual(pet);
  });
});
