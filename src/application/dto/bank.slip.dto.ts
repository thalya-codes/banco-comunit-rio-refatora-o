import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';
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
  @IsString()
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
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  payerId: string;

  @IsNotEmpty()
  @IsString()
  payeeId: string;
}
