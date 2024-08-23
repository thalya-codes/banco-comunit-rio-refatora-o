import {
  AccountDto,
  AccountNumberDto,
  AlterAccountTypeDto,
  CreateAccountDto,
  IdDto,
  TransactionDto,
  UpdateAccountDto,
  WithdrawDto,
} from 'src/application/dto/account.dto';

export interface IAccountRepository {
  create(createAccountDto: CreateAccountDto): Promise<AccountDto | null>;
  delete(id: IdDto): Promise<void>;
  update(id: IdDto, updateAccountDto: UpdateAccountDto): Promise<AccountDto>;
  findAll(): Promise<AccountDto[]>;
  findOne(query: AccountNumberDto | IdDto): Promise<AccountDto>;
}

//como meu repositório fica dentro do meu service e está operação fica dentro do meu service
//eu posso apenas solicitar o número da conta de destino e o valor, aí dentro o service eu faço as manipulações
export interface IAccountService {
  generateAccountNumber(): string;
  getAccount(getAccountDto: AccountNumberDto): Promise<AccountDto>;
  getAllAccounts(): Promise<AccountDto[]>;
  deleteAccount(id: IdDto): void;
  updateAccount(
    id: IdDto,
    updateAccountDto: Partial<CreateAccountDto>,
  ): Promise<AccountDto>;
  alterAccountType(
    alterAccountTypeDto: AlterAccountTypeDto,
  ): Promise<AccountDto>;
  createAccount(createAccountDto: CreateAccountDto): Promise<AccountDto>;

  deposit(depositDto: TransactionDto): void;
  withdraw(withdrawDto: WithdrawDto): Promise<{ balance: number }>;
  // transfer(transferDto: TransactionDto): Promise<{ balance: number }>;
  consultBalance(consultBalanceDto: IdDto): Promise<{ balance: number }>;
  getAccount(id: IdDto): Promise<AccountDto>;
}
