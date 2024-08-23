import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PixKeyType } from 'src/domain/enums/business.enum';

export class CreatePixKeyDto {
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @IsNotEmpty()
  @IsNumber()
  pixKeyType: PixKeyType;

  pixKey?: string | number | null;
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
