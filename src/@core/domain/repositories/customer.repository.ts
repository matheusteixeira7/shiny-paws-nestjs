import { Customer } from '../entities/customer.entity';

export interface CustomersRepository {
  fineOneById(id: string): Promise<Customer | null>;
  findOneByEmail(email: string): Promise<Customer | null>;
  create(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Customer[]>;
}
