import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AccountType } from 'src/domain/enums/business.enum';
import { TDestinationAccountQuery } from 'src/domain/types/shared.type';

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
  customerId: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsNumber()
  accountType: number;

  @IsNotEmpty()
  pix_keys: string[] | number[];
}

export class AlterAccountTypeDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  type: AccountType;
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
}

export class CreateAccountRepositoryDto extends CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  accountNumber: string;
}

export type UpdateAccountDto = Partial<
  Omit<AccountDto, 'id' | 'accountNumber'>
>;

export class TransferDto {
  @IsNotEmpty()
  @IsString()
  originAccountId: string;

  @IsNotEmpty()
  @IsString()
  destinationAccountQuery: TDestinationAccountQuery;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
