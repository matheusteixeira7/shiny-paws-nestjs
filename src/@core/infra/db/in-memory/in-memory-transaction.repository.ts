import { Transaction } from '../../../domain/entities';
import { TransactionRepositoryInterface } from './../../../domain/repositories';

export class InMemoryTransactionRepository
  implements TransactionRepositoryInterface
{
  public items: Transaction[];

  private static INSTANCE: InMemoryTransactionRepository;

  private constructor() {
    this.items = [];
  }

  public static getInstance(): InMemoryTransactionRepository {
    if (!InMemoryTransactionRepository.INSTANCE) {
      InMemoryTransactionRepository.INSTANCE =
        new InMemoryTransactionRepository();
    }

    return InMemoryTransactionRepository.INSTANCE;
  }

  async findOneById(id: string): Promise<Transaction | null> {
    const transaction = this.items.find((transaction) => transaction.id === id);

    if (!transaction) {
      return null;
    }

    return transaction;
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const findIndex = this.items.findIndex(
      (item) => item.id === transaction.id,
    );

    if (findIndex === -1) {
      this.items.push(transaction);
    }

    return transaction;
  }
  async update(transaction: Transaction): Promise<Transaction> {
    const findIndex = this.items.findIndex(
      (item) => item.id === transaction.id,
    );

    if (findIndex !== -1) {
      this.items[findIndex] = transaction;
    }

    return transaction;
  }
  async remove(id: string): Promise<void> {
    const index = this.items.findIndex((transaction) => transaction.id === id);

    if (index === -1) {
      return null;
    }

    this.items.splice(index, 1);
  }
  async findAll(): Promise<Transaction[]> {
    return this.items;
  }
}
