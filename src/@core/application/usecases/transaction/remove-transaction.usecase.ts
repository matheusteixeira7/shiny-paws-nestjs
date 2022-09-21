import { TransactionRepositoryInterface } from '../../../domain/repositories';

export class RemoveTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) {}

  async execute(id: string): Promise<void> {
    const transactionFound = await this.transactionRepository.findOneById(id);

    if (!transactionFound) {
      throw new Error('Transaction not found');
    }

    await this.transactionRepository.remove(id);
  }
}
