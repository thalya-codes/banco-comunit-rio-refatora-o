import { Module } from '@nestjs/common';
import { CostumerService } from './service/costumer.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostumerEntity } from './entities/costumer.entity';
import { AccountEntity } from './entities/account.entity';
import { PixService } from './service/pix.service';
import { ManagerEntity } from './entities/manager.entity';
import { ManagerService } from './service/manager.service';
import { AccountService } from './service/account.service';
import { TransferReceiptService } from './service/transfer.receipt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostumerEntity, AccountEntity, ManagerEntity]),
    InfrastructureModule,
  ],
  providers: [
    {
      provide: 'ICostumerService',
      useClass: CostumerService,
    },
    {
      provide: 'IPixService',
      useClass: PixService,
    },
    {
      provide: 'IManagerService',
      useClass: ManagerService,
    },
    {
      provide: 'IAccountService',
      useClass: AccountService,
    },
    {
      provide: 'ITransferReceiptService',
      useClass: TransferReceiptService,
    },
  ],
  exports: [
    'ICostumerService',
    'IPixService',
    'IManagerService',
    'IAccountService',
    'ITransferReceiptService',
  ],
})
export class DomainModule {}
