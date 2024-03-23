import { UserResponse } from './user-response.dto';

export interface CustomerResponse {
  id: number;
  user: UserResponse;
  posts: number;
  rezervations: number;
}
