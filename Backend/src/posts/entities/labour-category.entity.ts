import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class LabourCategory extends AbstractEntity<LabourCategory> {
  @Column({ length: 30 })
  type: string;

  @Column()
  description: string;
}
