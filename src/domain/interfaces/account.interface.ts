import {
  AccountDto,
  AccountNumberDto,
  AlterAccountTypeDto,
  CreateAccountDto,
  CreateAccountRepositoryDto,
  IdDto,
  PixKeyDto,
  TransactionDto,
  TransferDto,
  TransferReturnDto,
  UpdateAccountDto,
  WithdrawDto,
} from 'src/application/dto/account.dto';

export interface IAccountRepository {
  create(
    createAccountDto: CreateAccountRepositoryDto,
  ): Promise<AccountDto | null>;
  delete(id: string): Promise<void>;
  update(id: string, updateAccountDto: UpdateAccountDto): Promise<AccountDto>;
  findAll(): Promise<AccountDto[]>;
  findOne(query: AccountNumberDto | IdDto | PixKeyDto): Promise<AccountDto>;
  save(account: AccountDto): Promise<AccountDto>;
}

export interface IAccountService {
  generateAccountNumber(): string;
  getAccount(getAccountDto: AccountNumberDto): Promise<AccountDto>;
  getAllAccounts(): Promise<AccountDto[]>;
  deleteAccount(id: string): Promise<void>;
  updateAccount(
    id: string,
    updateAccountDto: Partial<CreateAccountDto>,
  ): Promise<AccountDto>;
  alterAccountType(
    alterAccountTypeDto: AlterAccountTypeDto,
  ): Promise<AccountDto>;
  createAccount(createAccountDto: CreateAccountDto): Promise<AccountDto>;
  deposit(depositDto: TransactionDto): Promise<void>;
  withdraw(withdrawDto: WithdrawDto): Promise<{ balance: number }>;
  transfer(transferDto: TransferDto): Promise<TransferReturnDto>;
  consultBalance(id: string): Promise<{ balance: number }>;
  getAccount(id: IdDto | AccountNumberDto): Promise<AccountDto>;
}
