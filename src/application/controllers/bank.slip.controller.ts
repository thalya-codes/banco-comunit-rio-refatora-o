import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IBankSlipService } from 'src/domain/interfaces/bank.splip.interface';
import { BankSplipDto } from '../dto/bank.slip.dto';

@Controller('bank-splip')
export class BankSlipController {
  constructor(
    @Inject('IBankSlipService')
    private readonly bankSlipService: IBankSlipService,
  ) {}

  @Get()
  async getAll(): Promise<BankSplipDto[]> {
    return await this.bankSlipService.getAll();
  }

  @Get(':accountId')
  async getAllBySenderAccountId(
    @Param() { accountId }: { accountId: string },
  ): Promise<BankSplipDto[]> {
    return await this.bankSlipService.getAllBySenderAccountId(accountId);
  }

  // @Get(':accountId')
  // async getAllBySenderAccountId(
  //   @Param() { accountId }: { accountId: string },
  // ): Promise<BankSplipDto[]> {
  //   return await this.bankSlipService.getOneBySenderAccount(accountId);
  // }
}
