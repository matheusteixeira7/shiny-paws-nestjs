import { CustomerRepositoryInterface } from '../../../domain/repositories';

type CustomerProps = {
  id: string;
};

export class RemoveCustomerUseCase {
  constructor(private customersRepository: CustomerRepositoryInterface) {}

  async execute({ id }: CustomerProps) {
    const customer = await this.customersRepository.findOneById(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    this.customersRepository.remove(id);
  }
}
