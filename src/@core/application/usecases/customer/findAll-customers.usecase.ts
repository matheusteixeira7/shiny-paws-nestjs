import { CustomerRepositoryInterface } from '../../../domain/repositories';

export class FindAllCustomersUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute() {
    return this.customerRepository.findAll();
  }
}
