import { Transaction } from '../entities/transaction.entity';

export interface TransactionsRepository {
  fineOneById(id: string): Promise<Transaction | null>;
  create(customer: Transaction): Promise<Transaction>;
  update(customer: Transaction): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  delete(id: string): Promise<void>;
}
