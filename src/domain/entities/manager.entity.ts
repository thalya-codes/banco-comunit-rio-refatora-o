import { IsNotEmpty, IsString } from 'class-validator';
import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CostumerEntity } from './costumer.entity';

@Entity()
export class ManagerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @JoinColumn()
  @OneToMany(() => CostumerEntity, (costumer) => costumer.manager)
  customer: CostumerEntity;
}
