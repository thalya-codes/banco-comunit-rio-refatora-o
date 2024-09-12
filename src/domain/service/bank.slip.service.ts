import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAccountService } from '../interfaces/account.interface';
import { ErrorMessages } from '../enums/error-messages.enum';
import { TransferReceiptDto } from 'src/application/dto/transfer.receipt.dto';
import {
  GenerateBankSplipDto,
  ProcessBankSlipDto,
} from 'src/application/dto/bank.slip.dto';
import { v4 as uuidv4 } from 'uuid';
import { ICostumerService } from '../interfaces/costumer.interface';
@Injectable()
export class BankSlipService {
  constructor(
    @Inject('IAccountService')
    private readonly accountService: IAccountService,

    @Inject('ICostumerService')
    private readonly customerService: ICostumerService,
  ) {}

  //continuar: https://www.perplexity.ai/search/import-entity-primarygenerated-ccOVp7MKTO2EG49DOk5qoA

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

  async generateBankSplip(generateBankSplipDto: GenerateBankSplipDto) {
    const bankSlipNumber = this.generateBankSplipNumber(
      generateBankSplipDto.destinationAccount,
    );

    const barcode = this.generateBarcode(
      bankSlipNumber,
      generateBankSplipDto.amount,
    );

    //TODO: Fazer busca pelo payer e payee para obter os nomes dos mesmo

    const payer = await this.customerService.findCostumerById(
      generateBankSplipDto.payerId,
    );

    if (!payer)
      throw new HttpException('Payer not found', HttpStatus.NOT_FOUND);

    const payee = await this.customerService.findCostumerById(
      generateBankSplipDto.payeeId,
    );

    if (!payee)
      throw new HttpException('Payee not found', HttpStatus.NOT_FOUND);

    //TODO: No boleto 'imprimível' incluir o nome do benificiário e pagador,
    //porém na tabela de transações armazenar o id deles

    //TODO: Rever tabela de transferência e verifica diferença entre transferência e transação
    //TODO: Pensar em como armazenar os boletos gerados e pagos

    //juros
    //valor original
    //valor com juros
    const bankSlip = {
      bankSlipNumber,
      barcode,
      originalAmount: generateBankSplipDto.amount.toFixed(2),
      amountWithInterest: generateBankSplipDto.amount.toFixed(2),
      dueDate: generateBankSplipDto.dueDate.toISOString().split('T')[0],
      payer: payer.fullname,
      payee: payee.fullname,
    };

    return bankSlip; //boleto
  }

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
      //TODO: Ver como posso agendar o pagamento
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
