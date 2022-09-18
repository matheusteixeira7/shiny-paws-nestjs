import { Pet } from '../entities/pet.entity';

export interface PetRepositoryInterface {
  findOneById(id: string): Promise<Pet | null>;
  findOneByName(name: string): Promise<Pet[] | null>;
  findOwnerById(ownerId: string): Promise<Pet[]>;
  create(pet: Pet): Promise<Pet>;
  update(pet: Pet): Promise<Pet>;
  remove(id: string): Promise<void>;
  findAll(): Promise<Pet[]>;
}
