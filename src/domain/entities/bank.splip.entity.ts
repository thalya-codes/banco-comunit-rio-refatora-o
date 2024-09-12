import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity()
export class BankSlipTransferReceiptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AccountEntity, (account) => account.senderedReceipts)
  senderId: string;

  @ManyToOne(() => AccountEntity, (account) => account.receivedReceipts)
  recipientId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  originalAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amountWithInterest: number;

  @Column('date')
  dueDate: Date;

  @Column('varchar', { length: 255 })
  bankSlipNumber: string;

  @Column('varchar', { length: 255 })
  barcode: string;

  @CreateDateColumn()
  paymentDate: Date;
}
