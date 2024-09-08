import {
  Column,
  Entity,
  JoinColumn,
  // ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountDto } from 'src/application/dto/account.dto';
import { ManagerEntity } from './manager.entity';
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

  //add relação

  @ManyToOne(() => ManagerEntity, (manager) => manager.customers)
  @JoinColumn()
  managerId: string;

  @OneToMany(() => AccountEntity, (account) => account.customerId, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  accounts: AccountDto[];

  //TODO: Descomentar código abaixo quando as entidades Manager e Account forem criadas
  // @OneToMany(() => ManagerEnity, (manager) => manager.costumers)
  // @JoinColumn()
  // accounts: AccountEntity;

  @Column()
  salaryIncome: number;
}
