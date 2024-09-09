import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { PixKeyType } from 'src/domain/enums/business.enum';
import { IAccountService } from 'src/domain/interfaces/account.interface';
import { IPixService } from 'src/domain/interfaces/pix.interface';
import {
  AccountDto,
  AccountNumberDto,
  AlterAccountTypeDto,
  TransactionDto,
} from '../dto/account.dto';
import { IManagerService } from 'src/domain/interfaces/manager.interface';
import { OpenAccountDto } from '../dto/manager.dto';
import { ITransferReceiptService } from 'src/domain/interfaces/transfer.receipt.interface';
import { ProcessPixDto } from '../dto/pix.dto';
import { Transaction } from 'typeorm';

interface createPixDto {
  accountNumber: string;
  key_type: PixKeyType;
}

@Controller('account')
export class AccountController {
  constructor(
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
    @Inject('IPixService')
    private readonly pixService: IPixService,
    @Inject('IManagerService')
    private readonly managerServive: IManagerService,
    @Inject('ITransferReceiptService')
    private readonly transferReceiptService: ITransferReceiptService,
  ) {}

  @Post('create')
  async createAccount(
    @Body() openAccountDto: OpenAccountDto,
  ): Promise<{ accountNumber: string }> {
    return await this.managerServive.openAccount(openAccountDto);
  }

  @Get()
  async getAllAccounts(): Promise<AccountDto[]> {
    return await this.accountService.getAllAccounts();
  }

  @Get(':accountNumber')
  async getAccount(
    @Param() accountNumber: AccountNumberDto,
  ): Promise<AccountDto> {
    return await this.accountService.getAccount(accountNumber);
  }

  @Post('pix/create-key')
  async createPixKey(@Body() createPixKeyDto: createPixDto) {
    return await this.pixService.createKey(createPixKeyDto);
  }

  @Post('deposit')
  async deposit(@Body() transactionDto: TransactionDto) {
    return await this.accountService.deposit(transactionDto);
  }

  @Post('change-type')
  async changeAccountType(
    @Body() changeAccountTypeDto: AlterAccountTypeDto,
  ): Promise<AccountDto> {
    return await this.managerServive.changeAccountType(changeAccountTypeDto);
  }

  @Delete(':id')
  async deleteAccount(@Param() { id }: { id: string }) {
    return await this.accountService.deleteAccount(id);
  }

  @Post('transfer/pix')
  async transferByPix(processPixDto: ProcessPixDto) {
    return await this.pixService.processPix(processPixDto);
  }
}
