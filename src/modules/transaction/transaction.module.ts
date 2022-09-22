import { Module } from '@nestjs/common';

import {
  CreateTransactionUseCase,
  FindAllTransactionsUseCase,
  FindOneTransactionUseCase,
  RemoveTransactionUseCase,
  UpdateTransactionUseCase,
} from '../../@core/application/usecases/transaction';

import {
  CustomerRepositoryInterface,
  PetRepositoryInterface,
  ServiceRepositoryInterface,
  TransactionRepositoryInterface,
} from '../../@core/domain/repositories';

import {
  InMemoryCustomerRepository,
  InMemoryPetRepository,
  InMemoryServiceRepository,
  InMemoryTransactionRepository,
} from '../../@core/infra/db/in-memory';

import { TransactionController } from './transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [
    {
      provide: InMemoryTransactionRepository,
      useValue: InMemoryTransactionRepository.getInstance(),
    },
    {
      provide: InMemoryCustomerRepository,
      useValue: InMemoryCustomerRepository.getInstance(),
    },
    {
      provide: InMemoryPetRepository,
      useValue: InMemoryPetRepository.getInstance(),
    },
    {
      provide: InMemoryServiceRepository,
      useValue: InMemoryServiceRepository.getInstance(),
    },
    {
      provide: CreateTransactionUseCase,
      useFactory: (
        transactionRepository: TransactionRepositoryInterface,
        customerRepository: CustomerRepositoryInterface,
        petRepository: PetRepositoryInterface,
        serviceRepository: ServiceRepositoryInterface,
      ) => {
        return new CreateTransactionUseCase(
          transactionRepository,
          customerRepository,
          petRepository,
          serviceRepository,
        );
      },
      inject: [
        InMemoryTransactionRepository,
        InMemoryCustomerRepository,
        InMemoryPetRepository,
        InMemoryServiceRepository,
      ],
    },
    {
      provide: FindAllTransactionsUseCase,
      useFactory: (transactionRepository: TransactionRepositoryInterface) => {
        return new FindAllTransactionsUseCase(transactionRepository);
      },
      inject: [InMemoryTransactionRepository],
    },
    {
      provide: FindOneTransactionUseCase,
      useFactory: (transactionRepository: TransactionRepositoryInterface) => {
        return new FindOneTransactionUseCase(transactionRepository);
      },
      inject: [InMemoryTransactionRepository],
    },
    {
      provide: UpdateTransactionUseCase,
      useFactory: (transactionRepository: TransactionRepositoryInterface) => {
        return new UpdateTransactionUseCase(transactionRepository);
      },
      inject: [InMemoryTransactionRepository],
    },
    {
      provide: RemoveTransactionUseCase,
      useFactory: (transactionRepository: TransactionRepositoryInterface) => {
        return new RemoveTransactionUseCase(transactionRepository);
      },
      inject: [InMemoryTransactionRepository],
    },
  ],
})
export class TransactionModule {}
