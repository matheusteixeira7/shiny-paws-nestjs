import { Service } from '../entities/service.entity';

export interface ServicesRepository {
  findOneById(id: string): Promise<Service | null>;
  findManyById(ids: string[]): Promise<Service[]>;
  findOneByName(name: string): Promise<Service | null>;
  create(service: Service): Promise<Service>;
  update(service: Service): Promise<Service>;
  findAll(): Promise<Service[]>;
  delete(id: string): Promise<void>;
}
