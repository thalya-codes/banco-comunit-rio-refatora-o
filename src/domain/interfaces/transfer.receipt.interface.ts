import { BankSlipTransferReceiptDto } from 'src/application/dto/bank.splip.transfer.receipt.dto';
import {
  TransferReceiptBaseDto,
  TransferReceiptDto,
} from 'src/application/dto/transfer.receipt.dto';

export interface ITransferReceiptRepository {
  create(
    createReceiptDto: TransferReceiptBaseDto,
  ): Promise<TransferReceiptDto | null>;
  delete(id: string): Promise<void>;
  findAllBySender(senderId: string): Promise<TransferReceiptDto>;
  findOne(receiptId: string): Promise<TransferReceiptDto>;
  save(account: TransferReceiptDto): Promise<TransferReceiptDto>;
}

export interface ITransferReceiptService {
  createReceipt(
    createTransferDto: Omit<
      TransferReceiptBaseDto | BankSlipTransferReceiptDto,
      'transferDate'
    >,
  ): Promise<TransferReceiptDto | BankSlipTransferReceiptDto>;

  getReceiptById(
    id: string,
  ): Promise<TransferReceiptDto | BankSlipTransferReceiptDto>;
}
