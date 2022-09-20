import { ServiceRepositoryInterface } from '../../../domain/repositories';

export class RemoveServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const service = await this.serviceRepository.findOneById(id);

    if (!service) {
      throw new Error('Service not found');
    }

    await this.serviceRepository.remove(service.id);
  }
}
