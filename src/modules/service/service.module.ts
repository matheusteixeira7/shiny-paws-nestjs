import { Module } from '@nestjs/common';
import { InMemoryServiceRepository } from '../../@core/infra/db/in-memory';
import { ServiceController } from './service.controller';
import {
  CreateServiceUseCase,
  FindAllServicesUseCase,
  FindOneServiceUseCase,
  RemoveServiceUseCase,
  UpdateServiceUseCase,
} from '../../@core/application/usecases/service';
import { ServiceRepositoryInterface } from '../../@core/domain/repositories';

@Module({
  controllers: [ServiceController],
  providers: [
    {
      provide: InMemoryServiceRepository,
      useValue: InMemoryServiceRepository.getInstance(),
    },
    {
      provide: CreateServiceUseCase,
      useFactory: (serviceRepository: ServiceRepositoryInterface) => {
        return new CreateServiceUseCase(serviceRepository);
      },
      inject: [InMemoryServiceRepository],
    },
    {
      provide: FindAllServicesUseCase,
      useFactory: (serviceRepository: ServiceRepositoryInterface) => {
        return new FindAllServicesUseCase(serviceRepository);
      },
      inject: [InMemoryServiceRepository],
    },
    {
      provide: FindOneServiceUseCase,
      useFactory: (serviceRepository: ServiceRepositoryInterface) => {
        return new FindOneServiceUseCase(serviceRepository);
      },
      inject: [InMemoryServiceRepository],
    },
    {
      provide: UpdateServiceUseCase,
      useFactory: (serviceRepository: ServiceRepositoryInterface) => {
        return new UpdateServiceUseCase(serviceRepository);
      },
      inject: [InMemoryServiceRepository],
    },
    {
      provide: RemoveServiceUseCase,
      useFactory: (serviceRepository: ServiceRepositoryInterface) => {
        return new RemoveServiceUseCase(serviceRepository);
      },
      inject: [InMemoryServiceRepository],
    },
  ],
})
export class ServiceModule {}
