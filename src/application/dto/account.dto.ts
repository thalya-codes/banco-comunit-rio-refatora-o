import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CostumerDto } from './costumer.dto';

export class AccountNumberDto {
  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}

export class WithdrawDto extends AccountNumberDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class DepositDto extends AccountNumberDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class IdDto {
  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}

export class TransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  originAccountNumber: string;

  @IsNotEmpty()
  @IsString()
  destinationAccountNumber: string;
}

export class AccountDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsNotEmpty()
  costumer: CostumerDto;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}

export type CreateAccountDto = Omit<AccountDto, 'id'>;
export type UpdateAccountDto = Partial<Omit<AccountDto, 'id'>>;
