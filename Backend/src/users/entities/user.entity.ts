import { AbstractEntity } from './../../database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  @Column()
  phone: string;

  @Column()
  registrationDate: Date;
}
