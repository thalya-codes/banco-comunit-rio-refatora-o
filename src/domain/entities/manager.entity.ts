import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CostumerEntity } from './costumer.entity';

@Entity()
export class ManagerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({ type: 'varchar', unique: true, length: 11 })
  cpf: string;

  @Column({ type: 'simple-array', nullable: true })
  @OneToMany(() => CostumerEntity, (costumer) => costumer.managerId, {
    eager: true,
    cascade: true,
  })
  customers: string[];
}
