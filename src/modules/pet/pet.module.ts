import {
  CustomerRepositoryInterface,
  PetRepositoryInterface,
} from './../../@core/domain/repositories';
import { Module } from '@nestjs/common';
import {
  CreatePetUseCase,
  FindAllPetsUseCase,
  FindOnePetUseCase,
  RemovePetUseCase,
  UpdatePetUseCase,
} from '../../@core/application/usecases/pet';
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
    {
      provide: FindAllPetsUseCase,
      useFactory: (petRepository: PetRepositoryInterface) => {
        return new FindAllPetsUseCase(petRepository);
      },
      inject: [InMemoryPetRepository],
    },
    {
      provide: FindOnePetUseCase,
      useFactory: (petRepository: PetRepositoryInterface) => {
        return new FindOnePetUseCase(petRepository);
      },
      inject: [InMemoryPetRepository],
    },
    {
      provide: UpdatePetUseCase,
      useFactory: (
        petRepository: PetRepositoryInterface,
        customerRepository: CustomerRepositoryInterface,
      ) => {
        return new UpdatePetUseCase(petRepository, customerRepository);
      },
      inject: [InMemoryPetRepository, InMemoryCustomerRepository],
    },
    {
      provide: RemovePetUseCase,
      useFactory: (petRepository: PetRepositoryInterface) => {
        return new RemovePetUseCase(petRepository);
      },
      inject: [InMemoryPetRepository],
    },
  ],
})
export class PetModule {}
