import { Service } from '../../../domain/entities';
import { ServiceRepositoryInterface } from '../../../domain/repositories';

export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute(service: Service): Promise<Service> {}
}
