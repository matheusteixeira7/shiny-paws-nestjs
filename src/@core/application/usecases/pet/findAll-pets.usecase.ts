import { Pet } from '../../../domain/entities';
import { PetRepositoryInterface } from '../../../domain/repositories';

export class FindAllPetsUseCase {
  constructor(private readonly petRepository: PetRepositoryInterface) {}

  async execute(): Promise<Pet[]> {
    return this.petRepository.findAll();
  }
}
