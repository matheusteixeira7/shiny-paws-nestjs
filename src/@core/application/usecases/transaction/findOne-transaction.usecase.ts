import { Transaction } from '../../../domain/entities';
import { TransactionRepositoryInterface } from '../../../domain/repositories';

export class FindOneTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) {}

  async execute(id: string): Promise<Transaction> {
    const transactionFound = await this.transactionRepository.findOneById(id);

    if (!transactionFound) {
      throw new Error('Transaction not found');
    }

    return transactionFound;
  }
}
