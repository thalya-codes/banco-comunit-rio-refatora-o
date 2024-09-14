import {
  BankSplipBaseDto,
  BankSplipDto,
  CreateBankSlipDto,
} from 'src/application/dto/bank.slip.dto';
import {
  FindBankSlipTransferByBarcodeDto,
  FindBankSlipTransferByNumberDto,
  FindBankSlipTransferBySenderDto,
} from 'src/application/dto/bank.splip.transfer.receipt.dto';

export interface IBankSlipService {
  getAll(): Promise<BankSplipDto[]>;
  getAllBySenderAccountId(accountSenderId: string): Promise<BankSplipDto[]>;
  createBankSplip(
    generateBankSplipDto: CreateBankSlipDto,
  ): Promise<BankSplipDto>;
  generateBarcode(yourNumber: string, amount: number): string;
  generateBankSplipYourNumber(accountNumber: string): string;
}

export interface IBankSlipRepository {
  create(createDto: BankSplipBaseDto): Promise<BankSplipDto>;
  delete(id: string): Promise<void>;
  findAll(): Promise<BankSplipDto[]>;
  findAllBySender(senderId: string): Promise<BankSplipDto[]>;
  findOne(
    query:
      | FindBankSlipTransferBySenderDto
      | FindBankSlipTransferByBarcodeDto
      | FindBankSlipTransferByNumberDto,
  ): Promise<BankSplipDto>;
  save(bankSlip: BankSplipBaseDto): Promise<BankSplipDto>;
}
