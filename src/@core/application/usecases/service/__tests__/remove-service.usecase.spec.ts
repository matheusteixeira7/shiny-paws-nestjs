import { CreateServiceUseCase, RemoveServiceUseCase } from '..';
import { InMemoryServiceRepository } from '../../../../infra/db/in-memory';

let serviceRepository: InMemoryServiceRepository;
let createServiceUseCase: CreateServiceUseCase;
let sut: RemoveServiceUseCase;

describe('Find service use case', () => {
  beforeEach(() => {
    serviceRepository = InMemoryServiceRepository.getInstance();
    serviceRepository.items = [];

    createServiceUseCase = new CreateServiceUseCase(serviceRepository);

    sut = new RemoveServiceUseCase(serviceRepository);
  });

  it('should throw error if service is not found', async () => {
    await expect(sut.execute('invalid_id')).rejects.toThrowError(
      'Service not found',
    );
  });

  it('should be able to remove a service', async () => {
    const service = await createServiceUseCase.execute({
      name: 'Bath and grooming',
      price: 100,
    });

    await sut.execute(service.id);

    expect(serviceRepository.items).toHaveLength(0);
  });
});
