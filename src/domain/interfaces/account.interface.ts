import {
  AccountDto,
  AccountNumberDto,
  AmountDto,
  CreateAccountDto,
  IdDto,
  TransferDto,
  UpdateAccountDto,
} from 'src/application/dto/account.dto';

export interface IAccountRepository {
  create(createAccountDto: CreateAccountDto): Promise<AccountDto | null>;
  delete(id: string): Promise<void>;
  update(id: string, updateAccountDto: UpdateAccountDto): Promise<AccountDto>;
  findAll(): Promise<AccountDto[]>;
  findOne(query: AccountDto | IdDto): Promise<AccountDto>;
}

//como meu repositório fica dentro do meu service e está operação fica dentro do meu service
//eu posso apenas solicitar o número da conta de destino e o valor, aí dentro o service eu faço as manipulações
export interface IAccountService {
  deposit(amountDto: AmountDto): Promise<{ balance: number }>;
  withdraw(amountDto: AmountDto): Promise<{ balance: number }>;
  transfer(transferDto: TransferDto): Promise<{ balance: number }>;
  consultBalance(
    accountNumberDto: AccountNumberDto,
  ): Promise<{ balance: number }>;
  getAccount(accountNumberDto: AccountNumberDto): Promise<AccountDto>;
}
