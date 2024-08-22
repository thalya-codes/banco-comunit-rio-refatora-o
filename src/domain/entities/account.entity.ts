import {
  Check,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CostumerEntity } from './costumer.entity';

@Entity()
@Check('"accountType" = 0 OR "accountType" = 1')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'float' })
  balance: number;

  @Column({ type: 'number' })
  accountType: number;

  @Column({ type: 'array' })
  @JoinColumn()
  @OneToMany(() => CostumerEntity, (costumer) => costumer.accounts)
  costumer: CostumerEntity;

  @Column({ type: 'varchar', unique: true, length: 13 })
  accountNumber: string;
}
