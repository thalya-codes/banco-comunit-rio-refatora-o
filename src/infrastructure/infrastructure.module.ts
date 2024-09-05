import { Module } from '@nestjs/common';
import { CostumerRepository } from './repositories/costumer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostumerEntity } from 'src/domain/entities/costumer.entity';
import { AccountRepository } from './repositories/account.repository';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { ManagerEntity } from 'src/domain/entities/manager.entity';
import { ManagerRepository } from './repositories/manager.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, CostumerEntity, ManagerEntity]),
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
  ],
  exports: ['ICostumerRepository', 'IAccountRepository', 'IManagerRepository'],
})
export class InfrastructureModule {}
