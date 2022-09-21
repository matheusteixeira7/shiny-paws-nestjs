import { Customer, Pet, Service, Transaction } from '../entities';

export interface TransactionRepositoryInterface {
  create(transaction: Transaction): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  findOneById(id: string): Promise<Transaction | null>;
  remove(id: string): Promise<void>;
  update(transaction: Transaction): Promise<Transaction>;
}
