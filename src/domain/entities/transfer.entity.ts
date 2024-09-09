import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CostumerEntity } from './costumer.entity';

@Entity()
export class TransferReceiptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CostumerEntity, { eager: true })
  senderId: string;

  @ManyToOne(() => CostumerEntity, { eager: true })
  recipientId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  transferDate: Date;
}
