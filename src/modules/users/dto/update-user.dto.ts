import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  password?: string;
  oldPassword?: string;
}
