import { CreateUserDto } from './create-user.dto';

export class CreateWorkerDto {
  user: CreateUserDto;
  openToWork: boolean;
  hourlyRate: number;
  rating: number;
}
