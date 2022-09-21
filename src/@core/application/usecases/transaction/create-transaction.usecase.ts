import { Customer, Pet, Service, Transaction } from '../../../domain/entities';
import {
  CustomerRepositoryInterface,
  PetRepositoryInterface,
  ServiceRepositoryInterface,
  TransactionRepositoryInterface,
} from '../../../domain/repositories';

type CreateTransactionDto = {
  customer: Customer;
  services: Service[];
  pets: Pet[];
  isPaid: boolean;
};

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryInterface,
    private readonly customerRepository: CustomerRepositoryInterface,
    private readonly petRepository: PetRepositoryInterface,
    private readonly serviceRepository: ServiceRepositoryInterface,
  ) {}

  async execute({ customer, pets, services, isPaid }: CreateTransactionDto) {
    const customerFound = await this.customerRepository.findOneById(
      customer.id,
    );

    if (!customerFound) {
      throw new Error('Customer not found');
    }

    await Promise.all(
      pets.map(async (pet) => {
        const petFound = await this.petRepository.findOneById(pet.id);

        if (!petFound) {
          throw new Error('Pet not found');
        }

        if (petFound.ownerId !== customerFound.id) {
          throw new Error('Pet does not belong to customer');
        }
      }),
    );

    await Promise.all(
      services.map(async (service) => {
        const serviceFound = await this.serviceRepository.findOneById(
          service.id,
        );

        if (!serviceFound) {
          throw new Error('Service not found');
        }
      }),
    );

    const transaction = Transaction.create({
      customer,
      pets,
      services,
      isPaid,
      totalPrice: services.reduce((acc, service) => acc + service.price, 0),
    });

    return this.transactionRepository.create(transaction);
  }
}
