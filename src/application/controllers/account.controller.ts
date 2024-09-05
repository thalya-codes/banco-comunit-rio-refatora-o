import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PixKeyType } from 'src/domain/enums/business.enum';
import { IAccountService } from 'src/domain/interfaces/account.interface';
import { IPixService } from 'src/domain/interfaces/pix.interface';
import { CreateAccountDto } from '../dto/account.dto';

interface createPixDto {
  accountNumber: string;
  key_type: PixKeyType;
}

@Controller()
export class AccountController {
  constructor(
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
    @Inject('IPixService')
    private readonly pixService: IPixService,
  ) {}

  @Post('create')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<{ accountNumber: string }> {
    return await this.accountService.createAccount(createAccountDto);
  }

  @Post('pix/create-key')
  async createPixKey(@Body() createPixKeyDto: createPixDto) {
    return await this.pixService.createKey(createPixKeyDto);
  }
}
