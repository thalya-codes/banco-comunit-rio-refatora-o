export type CostumerDto = {
  id: string;
  fullname: string;
  address: string;
  telephone: string;
  salaryIncome: number;
  manager: any; //TODO: Adicionar tipagem correta quando for implementado
  accounts: any; //TODO: Adicionar tipagem correta quando for implementado
};

export type CreateCostumerDto = Omit<CostumerDto, 'id'>;

export type UpdateCostumerDto = Partial<CreateCostumerDto>;
