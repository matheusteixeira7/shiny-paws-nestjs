import { Customer } from '.';
import UniqueEntityId from '../value-objects/unique-entity-id';

export type PetProps = {
  name: string;
  specie: string;
  breed: string;
  owner: Customer;
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

  update(props: PetProps) {
    return Pet.create(props, this.uniqueId);
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

  get owner() {
    return this.props.owner;
  }

  private set owner(value: Customer) {
    this.props.owner = value;
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
