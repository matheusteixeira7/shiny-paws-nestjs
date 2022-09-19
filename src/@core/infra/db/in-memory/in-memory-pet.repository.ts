import { Pet } from '../../../domain/entities';
import { PetRepositoryInterface } from '../../../domain/repositories';

export class InMemoryPetRepository implements PetRepositoryInterface {
  public items: Pet[];

  private static INSTANCE: InMemoryPetRepository;

  private constructor() {
    this.items = [];
  }

  public static getInstance(): InMemoryPetRepository {
    if (!InMemoryPetRepository.INSTANCE) {
      InMemoryPetRepository.INSTANCE = new InMemoryPetRepository();
    }

    return InMemoryPetRepository.INSTANCE;
  }

  async findOneById(id: string): Promise<Pet> {
    const pet = this.items.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }
  async findManyByName(name: string): Promise<Pet[]> {
    const pet = this.items.filter((pet) => pet.name === name);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async create(pet: Pet): Promise<Pet> {
    const findIndex = this.items.findIndex((item) => item.id === pet.id);

    if (findIndex === -1) {
      this.items.push(pet);
    }

    return pet;
  }
  async update(pet: Pet): Promise<Pet> {
    const findIndex = this.items.findIndex((item) => item.id === pet.id);

    if (findIndex !== -1) {
      this.items[findIndex] = pet;
    }

    return pet;
  }
  async remove(id: string): Promise<void> {
    const index = this.items.findIndex((pet) => pet.id === id);

    if (index === -1) {
      return null;
    }

    this.items.splice(index, 1);
  }
  async findAll(): Promise<Pet[]> {
    return this.items;
  }
}
