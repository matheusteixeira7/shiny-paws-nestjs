import { Service } from '../../../domain/entities';
import { ServiceRepositoryInterface } from '../../../domain/repositories';

type UpdateServiceDto = {
  name: string;
  price: number;
};

export class UpdateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute(
    id: string,
    { name, price }: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.serviceRepository.findOneById(id);

    if (!service) {
      throw new Error('Service not found');
    }

    const updatedService = Service.update({ name, price }, id);

    return this.serviceRepository.update(updatedService);
  }
}
