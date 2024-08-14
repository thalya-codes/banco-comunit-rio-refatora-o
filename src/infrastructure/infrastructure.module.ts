import { Module } from '@nestjs/common';
import { CostumerRepository } from './repositories/costumer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostumerEntity } from 'src/domain/entities/costumer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostumerEntity])],
  providers: [
    {
      provide: 'ICostumerRepository',
      useClass: CostumerRepository,
    },
  ],
  exports: ['ICostumerRepository'],
})
export class InfrastructureModule {}
