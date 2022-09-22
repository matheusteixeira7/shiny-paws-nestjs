import { UpdateTransactionUseCase, CreateTransactionUseCase } from '..';

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

describe('Update Transaction Use Case', () => {
  let customerRepository: InMemoryCustomerRepository;
  let petRepository: InMemoryPetRepository;
  let serviceRepository: InMemoryServiceRepository;
  let transactionRepository: InMemoryTransactionRepository;

  let createCustomerUseCase: CreateCustomerUseCase;
  let createPetUseCase: CreatePetUseCase;
  let createServiceUseCase: CreateServiceUseCase;
  let createTransactionUseCase: CreateTransactionUseCase;

  let customer: Customer;
  let pet: Pet;
  let service: Service;
  let transaction: Transaction;

  let sut: UpdateTransactionUseCase;

  beforeEach(async () => {
    customerRepository = InMemoryCustomerRepository.getInstance();
    customerRepository.items = [];

    petRepository = InMemoryPetRepository.getInstance();
    petRepository.items = [];

    serviceRepository = InMemoryServiceRepository.getInstance();
    serviceRepository.items = [];

    transactionRepository = InMemoryTransactionRepository.getInstance();
    transactionRepository.items = [];

    createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    createPetUseCase = new CreatePetUseCase(petRepository, customerRepository);
    createServiceUseCase = new CreateServiceUseCase(serviceRepository);

    createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository,
      customerRepository,
      petRepository,
      serviceRepository,
    );

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

    transaction = await createTransactionUseCase.execute({
      customer,
      pets: [pet],
      services: [service],
      isPaid: false,
    });

    sut = new UpdateTransactionUseCase(transactionRepository);
  });

  it('should NOT be able to return a transaction with a non-existing id', async () => {
    await expect(
      sut.execute('non-existing-id', transaction),
    ).rejects.toThrowError('Transaction not found');
  });

  it('should be able to update a transaction', async () => {
    const dtoCustomer = await createCustomerUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '2499999-8888',
      address: '321 Main St',
    });

    const dtoPet = await createPetUseCase.execute(dtoCustomer.id, {
      name: 'Antonella',
      specie: 'cat',
      breed: 'Maine Coon',
    });

    const dtoService = await createServiceUseCase.execute({
      name: 'Bath and Grooming',
      price: 100,
    });

    const result = await sut.execute(transaction.id, {
      customer: dtoCustomer,
      pets: [dtoPet],
      services: [dtoService],
      isPaid: true,
      totalPrice: 100,
    });

    expect(result.customer).toEqual(dtoCustomer);
  });
});
