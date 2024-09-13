import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAccountService } from '../interfaces/account.interface';
import { ErrorMessages } from '../enums/error-messages.enum';
import {
  BankSlipTransferReceiptBaseDto,
  BankSlipTransferReceiptDto,
  GenerateBankSplipDto,
  GenerateBankSplipReturnDto,
} from 'src/application/dto/bank.splip.transfer.receipt.dto';
import { ICostumerService } from '../interfaces/costumer.interface';
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

    @Inject('ICostumerService')
    private readonly customerService: ICostumerService,

    @Inject('IBankSlipTransferReceiptRepository')
    private readonly bankSlipTransferReciptRepository: IBankSlipTransferReceiptRepository,
  ) {}

  generateBankSplipNumber(destinationAccount: string): string {
    const sequencial = uuidv4().slice(0, 5);
    const yourNumber = `${destinationAccount}${sequencial}`;

    return yourNumber;
  }

  generateBarcode(yourNumber: string, amount: number): string {
    const formattedAmount = (amount * 100).toString().padStart(10, '0');
    const barcode = `001${yourNumber}${formattedAmount}`;

    return barcode;
  }

  async generateBankSplip(
    generateBankSplipDto: GenerateBankSplipDto,
  ): Promise<GenerateBankSplipReturnDto> {
    const bankSlipNumber = this.generateBankSplipNumber(
      generateBankSplipDto.destinationAccount,
    );

    const barcode = this.generateBarcode(
      bankSlipNumber,
      generateBankSplipDto.amount,
    );

    const sender = await this.customerService.findCostumerById(
      generateBankSplipDto.senderId,
    );

    if (!sender)
      throw new HttpException('Sender not found', HttpStatus.NOT_FOUND);

    const receipt = await this.customerService.findCostumerById(
      generateBankSplipDto.recipientId,
    );

    if (!receipt) {
      throw new HttpException('Receipt not found', HttpStatus.NOT_FOUND);
    }

    const bankSlip: GenerateBankSplipReturnDto = {
      bankSlipNumber,
      barcode,
      originalAmount: +generateBankSplipDto.amount.toFixed(2),
      amountWithInterest: +generateBankSplipDto.amount.toFixed(2),
      dueDate: generateBankSplipDto.dueDate,
      senderId: sender.fullname,
      recipientId: receipt.fullname,
    };

    return bankSlip;
  }

  async processBankSlip(
    processBankSlipDto: BankSlipTransferReceiptBaseDto,
  ): Promise<BankSlipTransferReceiptDto> {
    const today_date = new Date();
    const due_date = new Date(processBankSlipDto.dueDate);
    const week_day = today_date.getDay();
    const isWeekend = week_day === 5 || week_day === 6;
    const due_day = parseInt(due_date.toLocaleString().split('/')[0]);
    const today_day = parseInt(today_date.toLocaleString().split('/')[0]);
    let final_amount = processBankSlipDto.amount;
    const accountNumber = processBankSlipDto.bankSlipNumber.split('.')[0];

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
    const { recipientId, senderId, transferDate } =
      await this.accountService.transfer({
        originAccountId: processBankSlipDto.senderId,
        destinationAccountQuery: { accountNumber },
        amount: processBankSlipDto.amount,
      });

    return await this.bankSlipTransferReciptRepository.create({
      senderId,
      recipientId,
      transferDate,
      bankSlipNumber: processBankSlipDto.bankSlipNumber,
      barcode: processBankSlipDto.barcode,
      dueDate: processBankSlipDto.dueDate,
      originalAmount: processBankSlipDto.amount,
      amountWithInterest: final_amount,
    });
  }
}
