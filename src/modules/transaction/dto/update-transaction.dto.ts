import { PartialType } from '@nestjs/mapped-types';
import { Customer, Service, Pet } from '../../../@core/domain/entities';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  customer: Customer;
  services: Service[];
  pets: Pet[];
  isPaid: boolean;
  totalPrice: number;
}
