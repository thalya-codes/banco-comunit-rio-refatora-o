import { AccountDto } from './account.dto';

//TODO: Trocar interface por class com validators
export type CostumerDto = {
  id: string;
  fullname: string;
  address: string;
  telephone: string;
  salaryIncome: number;
  manager: any; //TODO: Adicionar dto correto quando for implementado
  accounts: AccountDto;
};

export type CreateCostumerDto = Omit<CostumerDto, 'id'>;

export type UpdateCostumerDto = Partial<CreateCostumerDto>;
