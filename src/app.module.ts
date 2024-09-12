import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CostumerEntity } from './domain/entities/costumer.entity';
import { AccountService } from './domain/service/account.service';
import { AccountEntity } from './domain/entities/account.entity';
import { ManagerEntity } from './domain/entities/manager.entity';
import { PixTransferReceiptEntity } from './domain/entities/pix.transfer.receipt.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.database'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: process.env.DATABASE_URL,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      entities: [
        CostumerEntity,
        AccountEntity,
        ManagerEntity,
        PixTransferReceiptEntity,
      ],
      synchronize: true,
    }),
    ApplicationModule,
    DomainModule,
    InfrastructureModule,
  ],
  controllers: [AppController],
  providers: [AppService, AccountService],
})
export class AppModule {}
