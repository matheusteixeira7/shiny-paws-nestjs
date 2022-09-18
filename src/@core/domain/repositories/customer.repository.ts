import { Customer } from '../entities/customer.entity';

export interface CustomerRepositoryInterface {
  create(customer: Customer): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  findOneByEmail(email: string): Promise<Customer | null>;
  findOneById(id: string): Promise<Customer | null>;
  remove(id: string): Promise<void>;
  update(customer: Customer): Promise<Customer>;
}
