import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransferReceiptBaseDto } from './transfer.receipt.dto';

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

import { TDestinationAccountQuery } from 'src/domain/types/shared.type';

export class ProcessBankSlipDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsUUID()
  originAccountId: string;

  @IsNotEmpty()
  @IsObject()
  destinationAccountQuery: TDestinationAccountQuery;

  @IsNotEmpty()
  @IsISO8601()
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  payCode: string;
}

export class GenerateBankSplipDto {
  @IsNotEmpty()
  @IsString()
  destinationAccount: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsISO8601()
  dueDate: string;

  @IsNotEmpty()
  @IsString()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  recipientId: string;
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
