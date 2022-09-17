import UniqueEntityId from '../value-objects/unique-entity-id';

export type ServiceProps = {
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Service {
  uniqueId: UniqueEntityId;

  private constructor(
    public readonly props: ServiceProps,
    uniqueId?: UniqueEntityId,
  ) {
    this.uniqueId = uniqueId ?? new UniqueEntityId();
  }

  static create(props: ServiceProps, uniqueId?: UniqueEntityId) {
    return new Service(props, uniqueId);
  }

  update(props: ServiceProps) {
    return Service.create(props, this.uniqueId);
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

  get price() {
    return this.props.price;
  }

  private set price(value: number) {
    this.props.price = value;
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
