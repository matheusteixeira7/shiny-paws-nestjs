import { Pet } from '../../../domain/entities';
import { PetRepositoryInterface } from '../../../domain/repositories';

export class FindOnePetUseCase {
  constructor(private petRepository: PetRepositoryInterface) {}

  async execute(id: string): Promise<Pet> {
    const pet = await this.petRepository.findOneById(id);

    if (!pet) {
      throw new Error('Pet not found');
    }

    return pet;
  }
}
