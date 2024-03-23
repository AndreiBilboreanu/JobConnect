import { UserResponse } from './user-response.dto';

export interface WorkerResponse {
  id: number;
  user: UserResponse;
  openToWork: boolean;
  rating: number;
}
