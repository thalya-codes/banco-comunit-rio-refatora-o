import { IsNotEmpty, IsDecimal, IsUUID, IsDate } from 'class-validator';

export class TransferReceiptBaseDto {
  @IsNotEmpty()
  @IsUUID()
  senderId: string;

  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  transferDate: Date | string;
}

export class TransferReceiptDto extends TransferReceiptBaseDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
