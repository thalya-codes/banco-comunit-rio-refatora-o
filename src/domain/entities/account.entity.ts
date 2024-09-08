import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CostumerEntity } from './costumer.entity';

@Entity()
@Check('"accountType" = 0 OR "accountType" = 1')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  balance: number;

  @Column({ type: 'int' })
  accountType: number;

  @ManyToOne(() => CostumerEntity, (costumer) => costumer.accounts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  customerId: string;

  @Column({ type: 'varchar', unique: true, length: 13 })
  accountNumber: string;

  @Column({ type: 'simple-array', unique: true, nullable: true })
  pix_keys: string[] | number[];
}
