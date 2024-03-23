import { Status } from 'src/posts/types/types';

export class LabourPostResponse {
  id: number;
  customer: number;
  description: string;
  status: Status;
  hoursOfWork: number;
  price: number;
  datePosted: Date;
  isCanceled: boolean;
}
