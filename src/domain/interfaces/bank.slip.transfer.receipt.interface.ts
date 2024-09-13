import {
  BankSlipTransferReceiptBaseDto,
  BankSlipTransferReceiptDto,
  GenerateBankSplipDto,
  GenerateBankSplipReturnDto,
} from 'src/application/dto/bank.splip.transfer.receipt.dto';

export interface IBankSlipTransferReceiptRepository {
  create(
    createReceiptDto: Omit<BankSlipTransferReceiptBaseDto, 'amount'>,
  ): Promise<BankSlipTransferReceiptDto | null>;
  delete(id: string): Promise<void>;
  findAllBySender(senderId: string): Promise<BankSlipTransferReceiptDto>;
  findOne(receiptId: string): Promise<BankSlipTransferReceiptDto>;
  save(
    account: BankSlipTransferReceiptDto,
  ): Promise<BankSlipTransferReceiptDto>;
}

export interface IBankSlipTransferReceiptService {
  generateBankSplipNumber(destinationAccount: string): string;
  generateBarcode(yourNumber: string, amount: number): string;
  generateBankSplip(
    generateBankSplipDto: GenerateBankSplipDto,
  ): Promise<GenerateBankSplipReturnDto>;
  processBankSlip(
    processBankSlipDto: Omit<BankSlipTransferReceiptBaseDto, 'amount'>,
  ): Promise<BankSlipTransferReceiptDto>;
}
