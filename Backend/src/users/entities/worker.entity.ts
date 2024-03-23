import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Worker extends AbstractEntity<Worker> {
  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @Column()
  openToWork: boolean;

  @Column()
  hourlyRate: number;

  @Column()
  rating: number;
}
