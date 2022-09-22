import { Customer, Service, Pet } from '../../../@core/domain/entities';

export class CreateTransactionDto {
  customer: Customer;
  services: Service[];
  pets: Pet[];
  isPaid: boolean;
}
