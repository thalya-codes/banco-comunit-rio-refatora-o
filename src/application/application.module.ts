import { Module } from '@nestjs/common';
import { CostumerController } from './controllers/customer.controller';
import { DomainModule } from 'src/domain/domain.module';
import { ManagerController } from './controllers/manager.controller';
import { AccountController } from './controllers/account.controller';
import { TesteController } from './controllers/test.controller';


@Module({
  imports: [DomainModule],
  controllers: [
    CostumerController,
    ManagerController,
    AccountController,
    TesteController,
  ],
})
export class ApplicationModule {}
