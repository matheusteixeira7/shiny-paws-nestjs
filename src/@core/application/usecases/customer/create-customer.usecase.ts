import { Customer } from '../../../domain/entities';
import { CustomerRepositoryInterface } from '../../../domain/repositories';

type CustomerDto = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute({ name, email, phone, address }: CustomerDto) {
    const customerExists = await this.customerRepository.findOneByEmail(email);

    if (customerExists) {
      throw new Error('Customer already exists');
    }

    const customer = Customer.create({
      name,
      email,
      phone,
      address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.customerRepository.create(customer);

    return customer;
  }
}
