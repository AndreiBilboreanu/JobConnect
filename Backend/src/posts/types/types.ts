import { ValueOf } from 'src/types/utils';

export enum Status {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Declined = 'declined',
}

export type StatusType = ValueOf<typeof Status>;
