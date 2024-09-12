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
  UpdateAccountDto,
  WithdrawDto,
} from 'src/application/dto/account.dto';
import { TransferReceiptDto } from 'src/application/dto/transfer.receipt.dto';

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

//como meu repositório fica dentro do meu service e está operação fica dentro do meu service
//eu posso apenas solicitar o número da conta de destino e o valor, aí dentro o service eu faço as manipulações
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
  transfer(transferDto: TransferDto): Promise<TransferReceiptDto>;
  consultBalance(id: string): Promise<{ balance: number }>;
  getAccount(id: IdDto | AccountNumberDto): Promise<AccountDto>;
}
