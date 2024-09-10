import {
  Check,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CostumerEntity } from './costumer.entity';
import { TransferReceiptDto } from 'src/application/dto/transfer-receipt.dto';
import { TransferReceiptEntity } from './transfer.entity';

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
    onUpdate: 'CASCADE',
  })
  customerId: string;

  @Column({ type: 'varchar', unique: true, length: 13 })
  accountNumber: string;

  @Column({ type: 'simple-array', unique: true, nullable: true })
  pix_keys: string[] | number[];

  @OneToMany(() => TransferReceiptEntity, (transfer) => transfer.recipientId, {
    eager: true,
  })
  receivedReceipts: TransferReceiptDto[];

  @OneToMany(() => TransferReceiptEntity, (transfer) => transfer.senderId, {
    eager: true,
  })
  senderedReceipts: TransferReceiptDto[];
}
