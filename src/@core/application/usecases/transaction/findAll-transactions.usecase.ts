import { Transaction } from '../../../domain/entities';
import { TransactionRepositoryInterface } from '../../../domain/repositories';

export class FindAllTransactionsUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) {}

  async execute(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }
}
