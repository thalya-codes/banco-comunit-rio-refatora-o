import { Module } from '@nestjs/common';
import { CostumerController } from './controllers/customer.controller';
import { DomainModule } from 'src/domain/domain.module';
import { ManagerController } from './controllers/manager.controller';
import { AccountController } from './controllers/account.controller';
import { BankSlipController } from './controllers/bank.slip.controller';

@Module({
  imports: [DomainModule],
  controllers: [
    CostumerController,
    ManagerController,
    AccountController,
    BankSlipController,
  ],
})
export class ApplicationModule {}
