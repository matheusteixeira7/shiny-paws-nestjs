import UniqueEntityId from '../value-objects/unique-entity-id';

export type PetProps = {
  name: string;
  specie: string;
  breed: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Pet {
  uniqueId: UniqueEntityId;

  private constructor(
    public readonly props: PetProps,
    uniqueId?: UniqueEntityId,
  ) {
    this.uniqueId = uniqueId ?? new UniqueEntityId();
  }

  static create(props: PetProps, uniqueId?: UniqueEntityId) {
    return new Pet(props, uniqueId);
  }

  static update(props: PetProps, id: string) {
    return new Pet(props, new UniqueEntityId(id));
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

  get specie() {
    return this.props.specie;
  }

  private set specie(value: string) {
    this.props.specie = value;
  }

  get breed() {
    return this.props.breed;
  }

  private set breed(value: string) {
    this.props.breed = value;
  }

  get ownerId() {
    return this.props.ownerId;
  }

  private set ownerId(value: string) {
    this.props.ownerId = value;
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
