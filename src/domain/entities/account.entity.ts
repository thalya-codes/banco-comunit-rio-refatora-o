import {
  Check,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CostumerEntity } from './costumer.entity';
import { CostumerDto } from 'src/application/dto/costumer.dto';

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
  costumer: string[];

  @Column({ type: 'varchar', unique: true, length: 13 })
  accountNumber: string;

  @Column({ type: 'simple-array', unique: true, nullable: true })
  pix_keys: string[] | number[] | null;
}
