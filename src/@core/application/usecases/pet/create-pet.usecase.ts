import { Pet } from '../../../domain/entities';
import {
  CustomerRepositoryInterface,
  PetRepositoryInterface,
} from '../../../domain/repositories';

type CreatePetDto = {
  name: string;
  specie: 'dog' | 'cat';
  breed: string;
};

export class CreatePetUseCase {
  constructor(
    private petRepository: PetRepositoryInterface,
    private customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(id: string, { name, specie, breed }: CreatePetDto) {
    const customer = await this.customerRepository.findOneById(id);

    if (!customer) {
      throw new Error('Customer does not exist.');
    }

    const pet = Pet.create({
      name,
      specie,
      breed,
      owner: customer,
    });

    this.petRepository.create(pet);

    return pet;
  }
}
