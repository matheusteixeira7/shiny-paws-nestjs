import { CustomerRepositoryInterface } from '../../../domain/repositories';

type CustomerProps = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(id: string, { name, email, phone, address }: CustomerProps) {
    const customer = await this.customerRepository.findOneById(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    Object.assign(customer, {
      ...customer,
      name,
      email,
      phone,
      address,
      updatedAt: new Date(),
    });

    this.customerRepository.update(customer);

    return customer;
  }
}
