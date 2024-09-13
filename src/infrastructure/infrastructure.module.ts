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
import { BankSlipTransferReceiptEntity } from 'src/domain/entities/bank.splip.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      CostumerEntity,
      ManagerEntity,
      PixTransferReceiptEntity,
      BankSlipTransferReceiptEntity,
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
  ],
  exports: [
    'ICostumerRepository',
    'IAccountRepository',
    'IManagerRepository',
    'ITransferReceiptRepository',
    'IBankSlipTransferReceiptRepository',
  ],
})
export class InfrastructureModule {}
