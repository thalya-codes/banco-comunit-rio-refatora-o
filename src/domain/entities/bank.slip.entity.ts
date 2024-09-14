import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity()
export class BankSlipEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  bankSlipNumber: string;

  @Column({ type: 'varchar' })
  barcode: string;

  @Column({ type: 'real' })
  originalAmount: number;

  @Column({ type: 'real' })
  amountWithInterest: number;

  @Column({ type: 'varchar' })
  dueDate: string;

  @ManyToOne(() => AccountEntity, (account) => account.bank_slip)
  @JoinColumn({ name: 'senderId' }) // Especifica a coluna que contém a chave estrangeira
  senderId: string; // Deve ser do tipo AccountEntity

  @Column({ type: 'varchar' })
  recipientId: string;
}
