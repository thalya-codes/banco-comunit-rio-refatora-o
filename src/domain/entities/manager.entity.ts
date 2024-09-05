import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CostumerEntity } from './costumer.entity';
import { CostumerDto } from 'src/application/dto/costumer.dto';

@Entity()
export class ManagerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({ type: 'varchar', unique: true, length: 11 })
  cpf: string;

  @Column({ type: 'simple-array', default: [] })
  // @OneToMany(() => CostumerEntity, (costumer) => costumer.managerId)
  customers: string[];
}
