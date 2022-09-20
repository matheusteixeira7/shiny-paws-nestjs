import { Service } from '../../../domain/entities';
import { ServiceRepositoryInterface } from '../../../domain/repositories';

export class FindAllServicesUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute(): Promise<Service[]> {
    return await this.serviceRepository.findAll();
  }
}
