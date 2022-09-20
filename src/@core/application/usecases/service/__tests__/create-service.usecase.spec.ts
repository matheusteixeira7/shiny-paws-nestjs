import { CreateServiceUseCase } from '..';
import { InMemoryServiceRepository } from '../../../../infra/db/in-memory';

let serviceRepository: InMemoryServiceRepository;
let sut: CreateServiceUseCase;

describe('Create pet use case', () => {
  beforeEach(() => {
    serviceRepository = InMemoryServiceRepository.getInstance();
    serviceRepository.items = [];

    sut = new CreateServiceUseCase(serviceRepository);
  });

  it('should throw an error if service name already exist', async () => {
    await sut.execute({ name: 'service name', price: 10 });

    await expect(
      sut.execute({ name: 'service name', price: 10 }),
    ).rejects.toThrowError('Service name already exists');
  });

  it('should be able to create a new service', async () => {
    const service = await sut.execute({ name: 'service name', price: 10 });

    expect(service).toHaveProperty('id');
    expect(service.name).toBe('service name');
    expect(service.price).toBe(10);
  });
});
