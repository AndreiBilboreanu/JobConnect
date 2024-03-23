import { IsNumber, IsOptional } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateCustomerDto {
  @IsOptional()
  user: UpdateUserDto;

  @IsOptional()
  @IsNumber()
  posts: number;

  @IsOptional()
  @IsNumber()
  rezervations: number;
}
