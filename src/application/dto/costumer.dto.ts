import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AccountDto } from './account.dto';

//TODO: Trocar interface por class com validators
export class CostumerDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsNumber()
  salaryIncome: number;

  @IsNotEmpty()
  @IsString()
  managerId: string; //TODO: Adicionar dto correto quando for implementado

  @IsOptional()
  accounts: AccountDto[];
}

export type CreateCostumerDto = Omit<CostumerDto, 'id'>;

export type UpdateCostumerDto = Partial<CreateCostumerDto>;
