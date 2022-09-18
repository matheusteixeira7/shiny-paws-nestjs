import { Pet } from '../entities/pet.entity';

export interface PetRepositoryInterface {
  findOneById(id: string): Promise<Pet | null>;
  findManyByName(name: string): Promise<Pet[] | null>;
  create(pet: Pet): Promise<Pet>;
  update(pet: Pet): Promise<Pet>;
  remove(id: string): Promise<void>;
  findAll(): Promise<Pet[]>;
}
