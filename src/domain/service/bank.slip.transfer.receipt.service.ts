import { Inject, Injectable } from '@nestjs/common';
import { IAccountService } from '../interfaces/account.interface';
import { ErrorMessages } from '../enums/error-messages.enum';
import {
  BankSlipTransferReceiptDto,
  ProcessBankSlipDto,
} from 'src/application/dto/bank.splip.transfer.receipt.dto';
import {
  IBankSlipTransferReceiptRepository,
  IBankSlipTransferReceiptService,
} from '../interfaces/bank.slip.transfer.receipt.interface';
@Injectable()
export class BankSlipTransferReceiptService
  implements IBankSlipTransferReceiptService
{
  constructor(
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
    @Inject('IBankSlipTransferReceiptRepository')
    private readonly bankSlipTransferReciptRepository: IBankSlipTransferReceiptRepository,
  ) {}

  async processBankSlip(
    processBankSlipDto: ProcessBankSlipDto,
  ): Promise<BankSlipTransferReceiptDto> {
    const bankSlipInfos = await this.bankSlipTransferReciptRepository.findOne(
      processBankSlipDto.bankSlipQuery,
    );

    const today_date = new Date();
    const due_date = new Date(bankSlipInfos.dueDate);
    const week_day = today_date.getDay();
    const isWeekend = week_day === 5 || week_day === 6;
    const due_day = parseInt(due_date.toLocaleString().split('/')[0]);
    const today_day = parseInt(today_date.toLocaleString().split('/')[0]);
    let final_amount = bankSlipInfos.amount;
    const accountNumber = bankSlipInfos.bankSlipNumber.split('.')[0];

    if (today_day > due_day) {
      const continuos_day = today_day - due_day;
      const interest_rate_per_day = 0.5 / 100;

      final_amount =
        bankSlipInfos.amount *
        Math.pow(1 + interest_rate_per_day, continuos_day);
    }

    if (isWeekend) {
      console.log(ErrorMessages.PAYMENT_SCHEDULED);
      return;
    }
    const { recipientId, senderId, transferDate } =
      await this.accountService.transfer({
        originAccountId: bankSlipInfos.senderId,
        destinationAccountQuery: { accountNumber },
        amount: bankSlipInfos.amount,
      });

    const receipt = await this.bankSlipTransferReciptRepository.create({
      senderId,
      recipientId,
      transferDate,
      bankSlipNumber: bankSlipInfos.bankSlipNumber,
      barcode: bankSlipInfos.barcode,
      dueDate: bankSlipInfos.dueDate,
      originalAmount: bankSlipInfos.amount,
      amountWithInterest: final_amount,
    });

    return receipt;
  }
}
