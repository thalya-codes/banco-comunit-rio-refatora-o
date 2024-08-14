import { Module } from '@nestjs/common';
import { CostumerService } from './service/costumer.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostumerEntity } from './entities/costumer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostumerEntity]), InfrastructureModule],
  providers: [
    {
      provide: 'ICostumerService',
      useClass: CostumerService,
    },
  ],
  exports: ['ICostumerService'],
})
export class DomainModule {}
