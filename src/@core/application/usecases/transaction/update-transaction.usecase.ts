import { Customer, Pet, Service, Transaction } from '../../../domain/entities';
import { TransactionRepositoryInterface } from '../../../domain/repositories';

type UpdateTransactionDto = {
  customer: Customer;
  pets: Pet[];
  services: Service[];
  isPaid: boolean;
  totalPrice: number;
};

export class UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) {}

  async execute(id: string, props: UpdateTransactionDto): Promise<Transaction> {
    const transactionFound = await this.transactionRepository.findOneById(id);

    if (!transactionFound) {
      throw new Error('Transaction not found');
    }

    const transactionUpdated = Transaction.update(props, id);

    return this.transactionRepository.update(transactionUpdated);
  }
}
