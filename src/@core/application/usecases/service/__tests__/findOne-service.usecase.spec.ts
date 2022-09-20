import { CreateServiceUseCase, FindOneServiceUseCase } from '..';
import { InMemoryServiceRepository } from '../../../../infra/db/in-memory';

let serviceRepository: InMemoryServiceRepository;
let createServiceUseCase: CreateServiceUseCase;
let sut: FindOneServiceUseCase;

describe('Find service use case', () => {
  beforeEach(() => {
    serviceRepository = InMemoryServiceRepository.getInstance();
    serviceRepository.items = [];

    createServiceUseCase = new CreateServiceUseCase(serviceRepository);

    sut = new FindOneServiceUseCase(serviceRepository);
  });

  it('should throw error if service is not found', async () => {
    await expect(sut.execute('invalid_id')).rejects.toThrowError(
      'Service not found',
    );
  });

  it('should return service if found', async () => {
    const service = await createServiceUseCase.execute({
      name: 'Bath and grooming',
      price: 100,
    });

    const result = await sut.execute(service.id);

    expect(result).toEqual(service);
  });
});
