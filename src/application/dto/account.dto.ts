import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AccountType } from 'src/domain/enums/business.enum';

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
  id: string;
}

export class PixKeyDto {
  @IsNotEmpty()
  pix_keys: string | number;
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
  costumer: string[];

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsNumber()
  accountType: number;
}

export class AlterAccountTypeDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  newAccountType: number;
}

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  managerId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsNumber()
  @IsNotEmpty()
  accountType: AccountType;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;
}

export type UpdateAccountDto = Partial<
  Omit<AccountDto, 'id' | 'accountNumber'>
>;
