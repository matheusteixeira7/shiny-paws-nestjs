import { Pet } from '../../../domain/entities';
import {
  CustomerRepositoryInterface,
  PetRepositoryInterface,
} from '../../../domain/repositories';

type UpdatePetDto = {
  name: string;
  specie: 'dog' | 'cat';
  breed: string;
  ownerId: string;
};

export class UpdatePetUseCase {
  constructor(
    private readonly petRepository: PetRepositoryInterface,
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(
    id: string,
    { name, specie, breed, ownerId }: UpdatePetDto,
  ): Promise<Pet> {
    const pet = await this.petRepository.findOneById(id);

    if (!pet) {
      throw new Error('Pet not found');
    }

    const owner = await this.customerRepository.findOneById(ownerId);

    if (!owner) {
      throw new Error('Owner not found');
    }

    const updatedPet = Pet.update({ name, specie, breed, ownerId }, id);

    return await this.petRepository.update(updatedPet);
  }
}
