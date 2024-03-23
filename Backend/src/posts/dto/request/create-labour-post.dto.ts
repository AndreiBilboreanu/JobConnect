import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateLabourPostDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  hoursOfWork: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  categories: number[];
}
