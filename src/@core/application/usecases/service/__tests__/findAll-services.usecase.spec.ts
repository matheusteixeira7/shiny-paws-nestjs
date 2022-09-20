import { CreateServiceUseCase, FindAllServicesUseCase } from '..';
import { InMemoryServiceRepository } from '../../../../infra/db/in-memory';

let serviceRepository: InMemoryServiceRepository;
let createServiceUseCase: CreateServiceUseCase;
let sut: FindAllServicesUseCase;

describe('Find all pets use case', () => {
  beforeEach(() => {
    serviceRepository = InMemoryServiceRepository.getInstance();
    serviceRepository.items = [];

    createServiceUseCase = new CreateServiceUseCase(serviceRepository);

    sut = new FindAllServicesUseCase(serviceRepository);
  });
  it('should be able to find all services', async () => {
    await createServiceUseCase.execute({
      name: 'Bath and grooming',
      price: 150,
    });

    await createServiceUseCase.execute({
      name: 'Cut nail',
      price: 100,
    });

    expect(await sut.execute()).toHaveLength(2);
  });
});
