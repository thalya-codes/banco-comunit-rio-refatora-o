import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity()
export class PixTransferReceiptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AccountEntity, (account) => account.senderedReceipts)
  senderId: string;

  @ManyToOne(() => AccountEntity, (account) => account.receivedReceipts)
  recipientId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  transferDate: Date;
}
