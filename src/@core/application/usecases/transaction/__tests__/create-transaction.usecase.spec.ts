import { CreateTransactionUseCase } from '..';
import {
  Customer,
  Pet,
  Service,
  Transaction,
} from '../../../../domain/entities';
import {
  InMemoryCustomerRepository,
  InMemoryPetRepository,
  InMemoryServiceRepository,
  InMemoryTransactionRepository,
} from '../../../../infra/db/in-memory';

import { CreateCustomerUseCase } from '../../customer';
import { CreatePetUseCase } from '../../pet';
import { CreateServiceUseCase } from '../../service';

describe('Create Transaction UseCase', () => {
  let customerRepository: InMemoryCustomerRepository;
  let serviceRepository: InMemoryServiceRepository;
  let petRepository: InMemoryPetRepository;
  let transactionRepository: InMemoryTransactionRepository;

  let createCustomerUseCase: CreateCustomerUseCase;
  let createPetUseCase: CreatePetUseCase;
  let createServiceUseCase: CreateServiceUseCase;

  let customer: Customer;
  let invalidCustomer: Customer;

  let pet: Pet;
  let invalidPet: Pet;

  let service: Service;
  let invalidService: Service;

  let transaction: Transaction;

  let sut: CreateTransactionUseCase;

  beforeEach(async () => {
    customerRepository = InMemoryCustomerRepository.getInstance();
    customerRepository.items = [];

    serviceRepository = InMemoryServiceRepository.getInstance();
    serviceRepository.items = [];

    petRepository = InMemoryPetRepository.getInstance();
    petRepository.items = [];

    transactionRepository = InMemoryTransactionRepository.getInstance();
    transactionRepository.items = [];

    createPetUseCase = new CreatePetUseCase(petRepository, customerRepository);
    createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    createServiceUseCase = new CreateServiceUseCase(serviceRepository);

    sut = new CreateTransactionUseCase(
      transactionRepository,
      customerRepository,
      petRepository,
      serviceRepository,
    );

    invalidCustomer = Customer.create({
      name: 'Invalid Customer',
      email: 'invalid@email.com',
      phone: 'invalid phone',
      address: 'invalid address',
    });

    invalidPet = Pet.create({
      name: 'Invalid Pet',
      breed: 'Invalid Breed',
      specie: 'Invalid Species',
      ownerId: invalidCustomer.id,
    });

    invalidService = Service.create({
      name: 'Invalid Service',
      price: 0,
    });

    customer = await createCustomerUseCase.execute({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '2499999-9999',
      address: '123 Main St',
    });

    pet = await createPetUseCase.execute(customer.id, {
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
    });

    service = await createServiceUseCase.execute({
      name: 'service name',
      price: 10,
    });

    transaction = await sut.execute({
      customer,
      pets: [pet],
      services: [service],
      isPaid: false,
    });
  });

  it('should throw error if customer is not found', async () => {
    await expect(
      sut.execute({
        customer: invalidCustomer,
        pets: [pet],
        services: [service],
        isPaid: false,
      }),
    ).rejects.toThrowError('Customer not found');
  });

  it('should throw error if pet is not found', async () => {
    await expect(
      sut.execute({
        customer,
        pets: [invalidPet],
        services: [service],
        isPaid: false,
      }),
    ).rejects.toThrowError('Pet not found');
  });

  it('should throw error if pet does not belong to customer', async () => {
    const otherCustomer = await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'john@email.com',
      phone: '2499999-9999',
      address: '123 Main St',
    });

    const otherPet = await createPetUseCase.execute(otherCustomer.id, {
      name: 'Apollo',
      specie: 'dog',
      breed: 'pitbull',
    });

    await expect(
      sut.execute({
        customer,
        pets: [otherPet],
        services: [service],
        isPaid: false,
      }),
    ).rejects.toThrowError('Pet does not belong to customer');

    await expect(
      sut.execute({
        customer: otherCustomer,
        pets: [pet],
        services: [service],
        isPaid: false,
      }),
    ).rejects.toThrowError('Pet does not belong to customer');
  });

  it('should throw error if service is not found', async () => {
    await expect(
      sut.execute({
        customer,
        pets: [pet],
        services: [invalidService],
        isPaid: false,
      }),
    ).rejects.toThrowError('Service not found');
  });

  it('should be able to create a transaction', async () => {
    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.id).toBeDefined();
    expect(transaction.customer).toBe(customer);
    expect(transaction.pets).toEqual([pet]);
    expect(transaction.services).toEqual([service]);
    expect(transaction.isPaid).toBeFalsy();
  });
});
