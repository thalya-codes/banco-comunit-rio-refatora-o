import {
  BankSlipTransferReceiptBaseDto,
  BankSlipTransferReceiptDto,
  FindBankSlipTransferByBarcodeDto,
  FindBankSlipTransferByNumberDto,
  FindBankSlipTransferBySenderDto,
  ProcessBankSlipDto,
} from 'src/application/dto/bank.splip.transfer.receipt.dto';

export interface IBankSlipTransferReceiptRepository {
  create(
    createReceiptDto: Omit<BankSlipTransferReceiptBaseDto, 'amount'>,
  ): Promise<BankSlipTransferReceiptDto | null>;
  delete(id: string): Promise<void>;
  findAllBySender(senderId: string): Promise<BankSlipTransferReceiptDto>;
  findOne(
    query:
      | FindBankSlipTransferBySenderDto
      | FindBankSlipTransferByBarcodeDto
      | FindBankSlipTransferByNumberDto,
  ): Promise<BankSlipTransferReceiptDto>;
  save(
    account: BankSlipTransferReceiptDto,
  ): Promise<BankSlipTransferReceiptDto>;
}

export interface IBankSlipTransferReceiptService {
  processBankSlip(
    processBankSlipDto: ProcessBankSlipDto,
  ): Promise<BankSlipTransferReceiptDto>;
}
