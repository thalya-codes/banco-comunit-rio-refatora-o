import { Inject, Injectable } from '@nestjs/common';
import { IAccountService } from '../interfaces/account.interface';
import { ErrorMessages } from '../enums/error-messages.enum';
import { TransferReceiptDto } from 'src/application/dto/transfer-receipt.dto';
import { ProcessBankSlipDto } from 'src/application/dto/bank.slip.dto';

@Injectable()
export class BankSlipService {
  constructor(
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
  ) {}

  async processBankSlip(
    processBankSlipDto: ProcessBankSlipDto,
  ): Promise<TransferReceiptDto> {
    const today_date = new Date();
    const due_date = new Date(processBankSlipDto.dueDate);
    const week_day = today_date.getDay();
    const isWeekend = week_day === 5 || week_day === 6;
    const due_day = parseInt(due_date.toLocaleString().split('/')[0]);
    const today_day = parseInt(today_date.toLocaleString().split('/')[0]);
    let final_amount = processBankSlipDto.amount;
    const accountNumber = processBankSlipDto.payCode.split('.')[0];

    if (today_day > due_day) {
      const continuos_day = today_day - due_day;
      const interest_rate_per_day = 0.5 / 100;

      final_amount =
        processBankSlipDto.amount *
        Math.pow(1 + interest_rate_per_day, continuos_day);
    }

    if (isWeekend) {
      console.log(ErrorMessages.PAYMENT_SCHEDULED);
      return;
    }

    return await this.accountService.transfer({
      originAccountId: processBankSlipDto.originAccountId,
      destinationAccountQuery: { accountNumber },
      amount: final_amount,
    });
  }
}
