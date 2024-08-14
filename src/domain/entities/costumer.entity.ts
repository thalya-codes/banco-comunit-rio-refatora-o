import {
  Column,
  Entity,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { AccountEntity } from './Account.orm';

@Entity()
export class CostumerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  address: string;

  @Column()
  telephone: string;

  @Column()
  manager: string;

  @Column()
  accounts: string;
  //TODO: Descomentar código abaixo quando as entidades Manager e Account forem criadas
  // @OneToMany(() => ManagerEnity, (manager) => manager.costumers)
  // @JoinColumn()
  // accounts: AccountEntity;

  // @ManyToOne(() => AccountEntity, (account) => account.costumer)
  // @JoinColumn()
  // accounts: AccountEntity;

  @Column()
  salaryIncome: number;
}
