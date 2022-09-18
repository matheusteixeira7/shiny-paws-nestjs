import { CustomerRepositoryInterface } from '../../../domain/repositories';

type CustomerProps = {
  id: string;
};

export class FindOneCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute({ id }: CustomerProps) {
    const customer = await this.customerRepository.findOneById(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    return customer;
  }
}
