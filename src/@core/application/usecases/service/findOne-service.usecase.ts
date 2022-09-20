import { Service } from '../../../domain/entities';
import { ServiceRepositoryInterface } from '../../../domain/repositories';

export class FindOneServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute(id: string): Promise<Service> {
    const service = await this.serviceRepository.findOneById(id);

    if (!service) {
      throw new Error('Service not found');
    }

    return service;
  }
}
