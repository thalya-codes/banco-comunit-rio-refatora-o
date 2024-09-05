import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ManagerBaseDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  customers?: any;
}
export class ManagerDto extends ManagerBaseDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
export class OpenAccountDto {
  @IsNotEmpty()
  @IsNumber()
  accountType: number;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  managerId: string;
}

export class CloseAccountDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;
}
