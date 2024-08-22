import { Module } from '@nestjs/common';
import { CostumerService } from './service/costumer.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostumerEntity } from './entities/costumer.entity';
import { AccountEntity } from './entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostumerEntity, AccountEntity]),
    InfrastructureModule,
  ],
  providers: [
    {
      provide: 'ICostumerService',
      useClass: CostumerService,
    },
  ],
  exports: ['ICostumerService'],
})
export class DomainModule {}
