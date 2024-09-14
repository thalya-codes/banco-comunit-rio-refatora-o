import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBankSlipDto {
  @IsNotEmpty()
  @IsString()
  senderAccountNumber: string;

  @IsNotEmpty()
  @IsUUID()
  recipientAccountNumber: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsISO8601()
  dueDate: string;
}

export class BankSplipBaseDto {
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

export class BankSplipDto extends BankSplipBaseDto {
  @IsUUID()
  id: string;
}
