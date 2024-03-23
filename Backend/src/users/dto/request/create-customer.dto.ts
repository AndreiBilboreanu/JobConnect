import { CreateUserDto } from './create-user.dto';

export class CreateCustomerDto {
  user: CreateUserDto;
  posts: number;
  rezervations: number;
}
