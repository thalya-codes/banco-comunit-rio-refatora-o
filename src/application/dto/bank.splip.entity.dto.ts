import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransferReceiptBaseDto } from './transfer.receipt.dto';

export class BankSlipTransferReceiptBaseDto extends TransferReceiptBaseDto {
  @IsNotEmpty()
  @IsNumber()
  originalAmount: number;

  @IsNotEmpty()
  @IsNumber()
  amountWithInterest: number;

  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

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
