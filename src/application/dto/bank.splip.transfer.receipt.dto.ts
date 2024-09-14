import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransferReceiptBaseDto } from './transfer.receipt.dto';

export class FindBankSlipTransferBySenderDto {
  @IsNotEmpty()
  @IsUUID()
  senderId: string;
}

export class FindBankSlipTransferByBarcodeDto {
  @IsNotEmpty()
  @IsString()
  barcode: string;
}

export class FindBankSlipTransferByNumberDto {
  @IsNotEmpty()
  @IsString()
  bankSlipNumber: string;
}

export class ProcessBankSlipDto {
  @IsNotEmpty()
  @IsUUID()
  senderId: string;

  @IsNotEmpty()
  @IsNumber()
  bankSlipQuery:
    | FindBankSlipTransferByBarcodeDto
    | FindBankSlipTransferByNumberDto;
}
export class BankSlipTransferReceiptBaseDto extends TransferReceiptBaseDto {
  @IsNotEmpty()
  @IsUUID()
  senderId: string;

  @IsNotEmpty()
  @IsNumber()
  originalAmount: number;

  @IsNotEmpty()
  @IsNumber()
  amountWithInterest: number;

  @IsNotEmpty()
  @IsISO8601()
  dueDate: string;

  @IsNotEmpty()
  @IsString()
  bankSlipNumber: string;

  @IsNotEmpty()
  @IsString()
  barcode: string;
}

export class BankSlipTransferReceiptDto extends BankSlipTransferReceiptBaseDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
export class GenerateBankSplipDto {
  @IsNotEmpty()
  @IsString()
  senderAccountNumber: string;

  @IsNotEmpty()
  @IsString()
  recipientAccountNumber: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsISO8601()
  dueDate: string;
}

export class GenerateBankSplipReturnDto {
  @IsNotEmpty()
  @IsString()
  bankSlipNumber: string;

  @IsNotEmpty()
  @IsString()
  barcode: string;

  @IsNotEmpty()
  @IsNumber()
  originalAmount: number;

  @IsNotEmpty()
  @IsNumber()
  amountWithInterest: number;

  @IsNotEmpty()
  @IsISO8601()
  dueDate: string;

  @IsNotEmpty()
  @IsUUID()
  senderId: string;

  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}
