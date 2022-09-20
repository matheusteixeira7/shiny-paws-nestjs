import { Service } from '../../../domain/entities';
import { ServiceRepositoryInterface } from '../../../domain/repositories';

export type ServiceDto = {
  name: string;
  price: number;
};

export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute({ name, price }: ServiceDto): Promise<Service> {
    const nameExists = await this.serviceRepository.findOneByName(name);

    if (nameExists) {
      throw new Error('Service name already exists');
    }

    const service = Service.create({ name, price });

    return this.serviceRepository.create(service);
  }
}
