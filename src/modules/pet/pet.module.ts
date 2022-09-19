import {
  CustomerRepositoryInterface,
  PetRepositoryInterface,
} from './../../@core/domain/repositories';
import { Module } from '@nestjs/common';
import { CreatePetUseCase } from '../../@core/application/usecases/pet';
import {
  InMemoryCustomerRepository,
  InMemoryPetRepository,
} from '../../@core/infra/db/in-memory';
import { PetController } from './pet.controller';
import { FindAllCustomersUseCase } from '../../@core/application/usecases/customer';

@Module({
  controllers: [PetController],
  providers: [
    {
      provide: InMemoryPetRepository,
      useValue: InMemoryPetRepository.getInstance(),
    },
    {
      provide: InMemoryCustomerRepository,
      useValue: InMemoryCustomerRepository.getInstance(),
    },
    {
      provide: CreatePetUseCase,
      useFactory: (
        petRepository: PetRepositoryInterface,
        customerRepository: CustomerRepositoryInterface,
      ) => {
        return new CreatePetUseCase(petRepository, customerRepository);
      },
      inject: [InMemoryPetRepository, InMemoryCustomerRepository],
    },
    {
      provide: FindAllCustomersUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new FindAllCustomersUseCase(customerRepository);
      },
      inject: [InMemoryCustomerRepository],
    },
  ],
})
export class PetModule {}
