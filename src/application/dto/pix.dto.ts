import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PixKeyType } from 'src/domain/enums/business.enum';

export class CreatePixKeyDto {
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsNumber()
  key_type: PixKeyType;
}

export class ProcessPixDto {
  @IsNotEmpty()
  destinationPixKey: string | number;

  @IsNotEmpty()
  @IsString()
  originAccountId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
