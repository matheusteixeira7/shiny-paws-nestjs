import { CreatePetUseCase, FindAllPetsUseCase } from '..';
import {
  InMemoryCustomerRepository,
  InMemoryPetRepository,
} from '../../../../infra/db/in-memory';
import { CreateCustomerUseCase } from '../../customer';

let petRepository: InMemoryPetRepository;
let customerRepository: InMemoryCustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let createPetUseCase: CreatePetUseCase;
let sut: FindAllPetsUseCase;

describe('Find all pets use case', () => {
  beforeEach(() => {
    petRepository = InMemoryPetRepository.getInstance();
    petRepository.clear();

    customerRepository = InMemoryCustomerRepository.getInstance();
    customerRepository.clear();

    createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    createPetUseCase = new CreatePetUseCase(petRepository, customerRepository);

    sut = new FindAllPetsUseCase(petRepository);
  });
  it('should be able to list pets', async () => {
    const customer = await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '2499999-9999',
      address: '123 Main St',
    });

    await createPetUseCase.execute(customer.id, {
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
    });

    await createPetUseCase.execute(customer.id, {
      name: 'Antonella',
      specie: 'cat',
      breed: 'persian',
    });

    const pets = await sut.execute();

    expect(pets).toHaveLength(2);
  });
});
