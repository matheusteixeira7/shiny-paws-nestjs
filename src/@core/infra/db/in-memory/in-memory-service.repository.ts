import { Service } from '../../../domain/entities';
import { ServiceRepositoryInterface } from '../../../domain/repositories';

export class InMemoryServiceRepository implements ServiceRepositoryInterface {
  public items: Service[];

  private static INSTANCE: InMemoryServiceRepository;

  private constructor() {
    this.items = [];
  }

  public static getInstance(): InMemoryServiceRepository {
    if (!InMemoryServiceRepository.INSTANCE) {
      InMemoryServiceRepository.INSTANCE = new InMemoryServiceRepository();
    }

    return InMemoryServiceRepository.INSTANCE;
  }

  async findOneById(id: string): Promise<Service | null> {
    const service = this.items.find((service) => service.id === id);

    if (!service) {
      return null;
    }

    return service;
  }

  async findManyById(ids: string[]): Promise<Service[]> {
    return this.items.filter((service) => ids.includes(service.id));
  }

  async findOneByName(name: string): Promise<Service | null> {
    const service = this.items.find((service) => service.name === name);

    if (!service) {
      return null;
    }

    return service;
  }

  async create(service: Service): Promise<Service> {
    const findIndex = this.items.findIndex((item) => item.id === service.id);

    if (findIndex === -1) {
      this.items.push(service);
    }

    return service;
  }

  async update(service: Service): Promise<Service> {
    const findIndex = this.items.findIndex((item) => item.id === service.id);

    if (findIndex !== -1) {
      this.items[findIndex] = service;
    }

    return service;
  }

  async findAll(): Promise<Service[]> {
    return this.items;
  }

  async remove(id: string): Promise<void> {
    const index = this.items.findIndex((service) => service.id === id);

    if (index === -1) {
      throw new Error('Service not found.');
    }

    this.items.splice(index, 1);
  }
}
