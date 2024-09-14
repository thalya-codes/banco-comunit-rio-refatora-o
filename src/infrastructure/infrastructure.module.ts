import { Module } from '@nestjs/common';
import { CostumerRepository } from './repositories/costumer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostumerEntity } from 'src/domain/entities/costumer.entity';
import { AccountRepository } from './repositories/account.repository';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { ManagerEntity } from 'src/domain/entities/manager.entity';
import { ManagerRepository } from './repositories/manager.repository';
import { TransferReceiptRepository } from './repositories/transfer.receipt.repository';
import { PixTransferReceiptEntity } from 'src/domain/entities/pix.transfer.receipt.entity';
import { BankSlipTransferReceiptRepository } from './repositories/bank.slip.transfer.receipt.repository';
import { BankSlipTransferReceiptEntity } from 'src/domain/entities/bank.splip.transfer.receipt.entity';
import { BankSlipEntity } from 'src/domain/entities/bank.slip.entity';
import { BankSlipRepository } from './repositories/bank.slip.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      CostumerEntity,
      ManagerEntity,
      PixTransferReceiptEntity,
      BankSlipTransferReceiptEntity,
      BankSlipEntity,
    ]),
  ],
  providers: [
    {
      provide: 'ICostumerRepository',
      useClass: CostumerRepository,
    },
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
    {
      provide: 'IManagerRepository',
      useClass: ManagerRepository,
    },
    {
      provide: 'ITransferReceiptRepository',
      useClass: TransferReceiptRepository,
    },
    {
      provide: 'IBankSlipTransferReceiptRepository',
      useClass: BankSlipTransferReceiptRepository,
    },
    {
      provide: 'IBankSlipRepository',
      useClass: BankSlipRepository,
    },
  ],
  exports: [
    'ICostumerRepository',
    'IAccountRepository',
    'IManagerRepository',
    'ITransferReceiptRepository',
    'IBankSlipTransferReceiptRepository',
    'IBankSlipRepository',
  ],
})
export class InfrastructureModule {}
