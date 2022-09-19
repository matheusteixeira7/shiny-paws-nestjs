import { Customer } from '../../../domain/entities';
import { CustomerRepositoryInterface } from './../../../domain/repositories';

export class InMemoryCustomerRepository implements CustomerRepositoryInterface {
  public items: Customer[];

  private static INSTANCE: InMemoryCustomerRepository;

  private constructor() {
    this.items = [];
  }

  public static getInstance(): InMemoryCustomerRepository {
    if (!InMemoryCustomerRepository.INSTANCE) {
      InMemoryCustomerRepository.INSTANCE = new InMemoryCustomerRepository();
    }

    return InMemoryCustomerRepository.INSTANCE;
  }

  async findOneById(id: string): Promise<Customer> {
    const customer = this.items.find((customer) => customer.id === id);

    if (!customer) {
      return null;
    }

    return customer;
  }
  async findOneByEmail(email: string): Promise<Customer> {
    const customer = this.items.find((customer) => customer.email === email);

    if (!customer) {
      return null;
    }

    return customer;
  }

  async create(customer: Customer): Promise<Customer> {
    const findIndex = this.items.findIndex((item) => item.id === customer.id);

    if (findIndex === -1) {
      this.items.push(customer);
    }

    return customer;
  }
  async update(customer: Customer): Promise<Customer> {
    const findIndex = this.items.findIndex((item) => item.id === customer.id);

    if (findIndex !== -1) {
      this.items[findIndex] = customer;
    }

    return customer;
  }
  async remove(id: string): Promise<void> {
    const index = this.items.findIndex((customer) => customer.id === id);

    if (index === -1) {
      throw new Error('Customer not found');
    }

    this.items.splice(index, 1);
  }
  async findAll(): Promise<Customer[]> {
    return this.items;
  }

  clear(): void {
    this.items = [];
  }
}
