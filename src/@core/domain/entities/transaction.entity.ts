import UniqueEntityId from '../value-objects/unique-entity-id';
import { Customer, Pet, Service } from '.';

export type TransactionProps = {
  customer: Customer;
  pets: Pet[];
  services: Service[];
  isPaid: boolean;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Transaction {
  uniqueId: UniqueEntityId;

  private constructor(
    public readonly props: TransactionProps,
    uniqueId?: UniqueEntityId,
  ) {
    this.uniqueId = uniqueId ?? new UniqueEntityId();
  }

  static create(props: TransactionProps, uniqueId?: UniqueEntityId) {
    return new Transaction(props, uniqueId);
  }

  update(props: TransactionProps) {
    return Transaction.create(props, this.uniqueId);
  }

  get id() {
    return this.uniqueId.value;
  }

  private set id(value: string) {
    this.uniqueId = new UniqueEntityId(value);
  }

  get totalPrice() {
    return this.props.totalPrice;
  }

  private set totalPrice(value: number) {
    this.props.totalPrice = value;
  }

  get isPaid() {
    return this.props.isPaid;
  }

  private set isPaid(value: boolean) {
    this.props.isPaid = value;
  }

  get customer() {
    return this.props.customer;
  }

  private set customer(value: Customer) {
    this.props.customer = value;
  }

  get services() {
    return this.props.services;
  }

  private set services(value: Service[]) {
    this.props.services = value;
  }

  get pets() {
    return this.props.pets;
  }

  private set pets(value: Pet[]) {
    this.props.pets = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  private set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private set updatedAt(value: Date) {
    this.props.updatedAt = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
