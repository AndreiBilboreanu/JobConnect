import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Status } from '../types/types';
import { Customer } from 'src/users/entities/customer.entity';
import { LabourCategory } from './labour-category.entity';

@Entity()
export class LabourPost extends AbstractEntity<LabourPost> {
  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: number;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column()
  hoursOfWork: number;

  @Column()
  price: number;

  @Column()
  datePosted: Date;

  @Column({ type: 'bool', default: false })
  isCanceled: boolean;

  @ManyToMany(() => LabourCategory, { cascade: true })
  @JoinTable()
  categories: LabourCategory[];

  //todo: add comets after Comment class have been made
}
