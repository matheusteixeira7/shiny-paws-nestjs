import UniqueEntityId from '../value-objects/unique-entity-id';

export type CustomerProps = {
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Customer {
  uniqueId: UniqueEntityId;

  private constructor(
    public readonly props: CustomerProps,
    uniqueId?: UniqueEntityId,
  ) {
    this.uniqueId = uniqueId ?? new UniqueEntityId();
  }

  static create(props: CustomerProps, uniqueId?: UniqueEntityId) {
    return new Customer(props, uniqueId);
  }

  update(props: CustomerProps) {
    return Customer.create(props, this.uniqueId);
  }

  get id() {
    return this.uniqueId.value;
  }

  private set id(value: string) {
    this.uniqueId = new UniqueEntityId(value);
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get email() {
    return this.props.email;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  get phone() {
    return this.props.phone;
  }

  private set phone(value: string) {
    this.props.phone = value;
  }

  get address() {
    return this.props.address;
  }

  private set address(value: string) {
    this.props.address = value;
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
