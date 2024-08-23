import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OpenAccountDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  accountType: number;
}

export class CloseAccountDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;
}
