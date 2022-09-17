import UniqueEntityId from '../value-objects/unique-entity-id';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User {
  uniqueId: UniqueEntityId;

  private constructor(
    public readonly props: UserProps,
    uniqueId?: UniqueEntityId,
  ) {
    this.uniqueId = uniqueId ?? new UniqueEntityId();
  }

  static create(props: UserProps, uniqueId?: UniqueEntityId) {
    return new User(props, uniqueId);
  }

  update(props: UserProps) {
    return User.create(props, this.uniqueId);
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

  get password() {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
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
