import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountDto } from 'src/application/dto/account.dto';
import { ManagerEntity } from './manager.entity';

@Entity()
export class CostumerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  fullname: string;

  @Column({ type: 'varchar', length: 300 })
  address: string;

  @Column({ type: 'varchar' })
  telephone: string;

  @ManyToOne(() => ManagerEntity, (manager) => manager.customers)
  @JoinColumn()
  managerId: string;

  @OneToMany(() => AccountEntity, (account) => account.customerId, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  accounts: AccountDto[];

  @Column()
  salaryIncome: number;
}
