import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { LabourPost } from 'src/posts/entities/labour-post.entity';

@Entity()
export class Customer extends AbstractEntity<Customer> {
  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @Column()
  posts: number;

  @Column()
  rezervations: number;

  @OneToMany(() => LabourPost, (labourPost) => labourPost.customer)
  labourPost: LabourPost[];
}
