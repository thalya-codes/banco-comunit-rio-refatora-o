import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CostumerEntity } from './costumer.entity';
import { TransferReceiptDto } from 'src/application/dto/transfer.receipt.dto';
import { PixTransferReceiptEntity } from './pix.transfer.receipt.entity';
import { BankSlipTransferReceiptDto } from 'src/application/dto/bank.splip.transfer.receipt.dto';
import { BankSlipEntity } from './bank.slip.entity';
import { BankSplipDto } from 'src/application/dto/bank.slip.dto';

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

  @OneToMany(() => BankSlipEntity, (bankSlip) => bankSlip.senderId, {
    eager: true,
    nullable: true,
  })
  bank_slip?: BankSplipDto[];

  @OneToMany(
    () => PixTransferReceiptEntity || BankSlipTransferReceiptDto,
    (transfer) => transfer.recipientId,
    {
      eager: true,
    },
  )
  receivedReceipts: TransferReceiptDto[] | BankSlipTransferReceiptDto[];

  @OneToMany(
    () => PixTransferReceiptEntity || BankSlipTransferReceiptDto,
    (transfer) => transfer.senderId,
    {
      eager: true,
    },
  )
  senderedReceipts: TransferReceiptDto[] | BankSlipTransferReceiptDto[];
}
