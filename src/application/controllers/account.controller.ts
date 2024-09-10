import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PixKeyType } from 'src/domain/enums/business.enum';
import { IAccountService } from 'src/domain/interfaces/account.interface';
import { IPixService } from 'src/domain/interfaces/pix.interface';
import {
  AccountDto,
  AccountNumberDto,
  AlterAccountTypeDto,
  CreateAccountDto,
  TransactionDto,
  WithdrawDto,
} from '../dto/account.dto';
import { IManagerService } from 'src/domain/interfaces/manager.interface';
import { OpenAccountDto } from '../dto/manager.dto';
import { ITransferReceiptService } from 'src/domain/interfaces/transfer.receipt.interface';
import { ProcessPixDto } from '../dto/pix.dto';

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

  @Get('balance/:id')
  async getBalance(
    @Param() { id }: { id: string },
  ): Promise<{ balance: number }> {
    return await this.accountService.consultBalance(id);
  }

  @Put(':id')
  async updateAccount(
    @Param() { id }: { id: string },
    @Body() updateAccountDto: Partial<CreateAccountDto>,
  ): Promise<AccountDto> {
    return await this.accountService.updateAccount(id, updateAccountDto);
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

  @Post('pix/create-key')
  async createPixKey(@Body() createPixKeyDto: createPixDto) {
    return await this.pixService.createKey(createPixKeyDto);
  }

  @Post('transfer/pix')
  async transferByPix(@Body() processPixDto: ProcessPixDto) {
    return await this.pixService.processPix(processPixDto);
  }

  @Post('transfer/bank-slip')
  async transferByBankSlip() {}

  @Post('deposit')
  async deposit(@Body() transactionDto: TransactionDto) {
    return await this.accountService.deposit(transactionDto);
  }

  @Post('withdraw')
  async withdraw(
    @Body() withdrawDto: WithdrawDto,
  ): Promise<{ balance: number }> {
    return await this.accountService.withdraw(withdrawDto);
  }
}
