import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IAccountService } from '../interfaces/account.interface';
import { v4 as uuidv4 } from 'uuid';
import {
  IBankSlipRepository,
  IBankSlipService,
} from '../interfaces/bank.splip.interface';
import {
  BankSplipBaseDto,
  BankSplipDto,
  CreateBankSlipDto,
} from 'src/application/dto/bank.slip.dto';

export class BankSlipService implements IBankSlipService {
  constructor(
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
    @Inject('IBankSlipRepository')
    private readonly bankSlipRepository: IBankSlipRepository,
  ) {}

  async getAll(): Promise<BankSplipDto[]> {
    return await this.bankSlipRepository.findAll();
  }
  async getAllBySenderAccountId(
    accountSenderId: string,
  ): Promise<BankSplipDto[]> {
    return await this.bankSlipRepository.findAllBySender(accountSenderId);
  }

  generateBankSplipYourNumber(accountNumber: string): string {
    const sequencial = uuidv4().slice(0, 5);
    const yourNumber = `${accountNumber}${sequencial}`;

    return yourNumber;
  }

  generateBarcode(yourNumber: string, amount: number): string {
    const formattedAmount = (amount * 100).toString().padStart(10, '0');
    const barcode = `001${yourNumber}${formattedAmount}`;

    return barcode;
  }

  async createBankSplip(generateBankSplipDto: CreateBankSlipDto): Promise<any> {
    const bankSlipNumber = this.generateBankSplipYourNumber(
      generateBankSplipDto.senderAccountNumber,
    );

    const barcode = this.generateBarcode(
      bankSlipNumber,
      generateBankSplipDto.amount,
    );

    const sender = await this.accountService.getAccount({
      accountNumber: generateBankSplipDto.senderAccountNumber,
    });

    if (!sender)
      throw new HttpException('Sender not found', HttpStatus.NOT_FOUND);

    const receipt = await this.accountService.getAccount({
      accountNumber: generateBankSplipDto.recipientAccountNumber,
    });

    if (!receipt) {
      throw new HttpException('Receipt not found', HttpStatus.NOT_FOUND);
    }

    const bankSlip: BankSplipBaseDto = {
      senderId: sender.id,
      recipientId: receipt.id,
      bankSlipNumber,
      barcode,
      originalAmount: +generateBankSplipDto.amount.toFixed(2),
      amountWithInterest: +generateBankSplipDto.amount.toFixed(2),
      dueDate: generateBankSplipDto.dueDate,
    };

    return await this.bankSlipRepository.create(bankSlip);
  }
}
