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
  id: IdDto;
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
  id: IdDto;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsNotEmpty()
  costumer: IdDto[];

  @IsNotEmpty()
  @IsString()
  accountNumber: IdDto;

  @IsNotEmpty()
  @IsNumber()
  accountType: number;
}

export class AlterAccountTypeDto {
  @IsString()
  @IsNotEmpty()
  id: IdDto;

  @IsNotEmpty()
  @IsNumber()
  newAccountType: number;
}

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  managerId: IdDto;

  @IsString()
  @IsNotEmpty()
  customerId: IdDto;

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
