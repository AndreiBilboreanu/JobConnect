import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLabourCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30, { message: 'Type must be at most 50 characters long' })
  type: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255, {
    message: 'Description must be at most 255 characters long',
  })
  description: string;
}
