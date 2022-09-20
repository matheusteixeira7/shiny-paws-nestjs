import { CreateServiceUseCase, UpdateServiceUseCase } from '..';
import { InMemoryServiceRepository } from '../../../../infra/db/in-memory';

let serviceRepository: InMemoryServiceRepository;
let createServiceUseCase: CreateServiceUseCase;
let sut: UpdateServiceUseCase;

describe('Update service use case', () => {
  beforeEach(() => {
    serviceRepository = InMemoryServiceRepository.getInstance();
    serviceRepository.items = [];

    createServiceUseCase = new CreateServiceUseCase(serviceRepository);

    sut = new UpdateServiceUseCase(serviceRepository);
  });

  it('should throw error if service is not found', async () => {
    await expect(
      sut.execute('invalid_id', {
        name: 'any_name',
        price: 10,
      }),
    ).rejects.toThrowError('Service not found');
  });

  it('should be able to update a service', async () => {
    const service = await createServiceUseCase.execute({
      name: 'Bath and grooming',
      price: 100,
    });

    const result = await sut.execute(service.id, {
      name: 'Cut nails',
      price: 80,
    });

    expect(result).toHaveProperty('id', service.id);
    expect(result).toHaveProperty('name', 'Cut nails');
    expect(result).toHaveProperty('price', 80);
  });
});
