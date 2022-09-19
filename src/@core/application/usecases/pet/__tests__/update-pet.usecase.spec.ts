import { CreatePetUseCase, UpdatePetUseCase, RemovePetUseCase } from '..';
import {
  InMemoryCustomerRepository,
  InMemoryPetRepository,
} from '../../../../infra/db/in-memory';
import { CreateCustomerUseCase } from '../../customer';

let petRepository: InMemoryPetRepository;
let customerRepository: InMemoryCustomerRepository;

let createCustomerUseCase: CreateCustomerUseCase;
let createPetUseCase: CreatePetUseCase;

let sut: UpdatePetUseCase;

describe('Update pet use case', () => {
  beforeEach(() => {
    petRepository = InMemoryPetRepository.getInstance();
    petRepository.clear();

    customerRepository = InMemoryCustomerRepository.getInstance();
    customerRepository.clear();

    createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    createPetUseCase = new CreatePetUseCase(petRepository, customerRepository);

    sut = new UpdatePetUseCase(petRepository, customerRepository);
  });

  it('should throw error if pet do not exists', async () => {
    await expect(
      sut.execute('invalid_id', {
        name: 'Apollo',
        specie: 'dog',
        breed: 'pitbull',
        ownerId: 'valid_id',
      }),
    ).rejects.toThrowError('Pet not found');
  });

  it('should throw error if owner do not exists', async () => {
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

    await expect(
      sut.execute(pet.id, {
        name: 'Apollo',
        specie: 'dog',
        breed: 'pitbull',
        ownerId: 'invalid_id',
      }),
    ).rejects.toThrowError('Owner not found');
  });

  it('should be able to update a pet', async () => {
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

    const result = await sut.execute(pet.id, {
      name: 'Antonella',
      specie: 'cat',
      breed: 'persian',
      ownerId: customer.id,
    });

    expect(result).toHaveProperty('id');
    expect(result.name).toBe('Antonella');
    expect(result.specie).toBe('cat');
    expect(result.breed).toBe('persian');
    expect(result.ownerId).toBe(customer.id);
  });
});
