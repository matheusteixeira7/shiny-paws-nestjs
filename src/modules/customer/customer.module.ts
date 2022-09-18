import { Module } from '@nestjs/common';
import {
  CreateCustomerUseCase,
  FindAllCustomersUseCase,
  FindOneCustomerUseCase,
  RemoveCustomerUseCase,
  UpdateCustomerUseCase,
} from '../../@core/application/usecases/customer';
import { CustomerRepositoryInterface } from '../../@core/domain/repositories';
import { InMemoryCustomerRepository } from '../../@core/infra/db/in-memory';
import { CustomerController } from './customer.controller';

@Module({
  controllers: [CustomerController],
  providers: [
    {
      provide: InMemoryCustomerRepository,
      useClass: InMemoryCustomerRepository,
    },
    {
      provide: CreateCustomerUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new CreateCustomerUseCase(customerRepository);
      },
      inject: [InMemoryCustomerRepository],
    },
    {
      provide: FindAllCustomersUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new FindAllCustomersUseCase(customerRepository);
      },
      inject: [InMemoryCustomerRepository],
    },
    {
      provide: FindOneCustomerUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new FindOneCustomerUseCase(customerRepository);
      },
      inject: [InMemoryCustomerRepository],
    },
    {
      provide: UpdateCustomerUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new UpdateCustomerUseCase(customerRepository);
      },
      inject: [InMemoryCustomerRepository],
    },
    {
      provide: RemoveCustomerUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new RemoveCustomerUseCase(customerRepository);
      },
      inject: [InMemoryCustomerRepository],
    },
  ],
})
export class CustomerModule {}
