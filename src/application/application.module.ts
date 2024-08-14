import { Module } from '@nestjs/common';
import { CostumerController } from './controllers/costumer.controller';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [CostumerController],
})
export class ApplicationModule {}
