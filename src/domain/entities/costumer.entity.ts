import {
  Column,
  Entity,
  JoinColumn,
  // ManyToMany,
  ManyToOne,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountDto } from 'src/application/dto/account.dto';
// import { AccountEntity } from './Account.orm';

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

  @Column()
  manager: string;

  @Column()
  @JoinColumn()
  @ManyToOne(() => AccountEntity, (account) => account.costumer)
  accounts: AccountEntity;
  //TODO: Descomentar código abaixo quando as entidades Manager e Account forem criadas
  // @OneToMany(() => ManagerEnity, (manager) => manager.costumers)
  // @JoinColumn()
  // accounts: AccountEntity;

  @Column()
  salaryIncome: number;
}
