import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  IAccountRepository,
  IAccountService,
} from '../interfaces/account.interface';
import {
  AccountDto,
  AccountNumberDto,
  AlterAccountTypeDto,
  CreateAccountDto,
  IdDto,
  TransactionDto,
  TransferDto,
  TransferReturnDto,
  WithdrawDto,
} from 'src/application/dto/account.dto';
import { ErrorMessages } from '../enums/error-messages.enum';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  generateAccountNumber(): string {
    return uuidv4().replace(/-/g, '').slice(0, 13);
  }

  async createAccount(createAccountDto: CreateAccountDto): Promise<AccountDto> {
    try {
      const account = await this.accountRepository.create({
        accountNumber: this.generateAccountNumber(),
        accountType: createAccountDto.accountType,
        customerId: createAccountDto.customerId,
        managerId: createAccountDto.managerId,
        balance: 0,
      });

      return account;
    } catch (error) {
      console.log({ error });
    }
  }

  async getAccount(
    getAccountDto: IdDto | AccountNumberDto,
  ): Promise<AccountDto> {
    try {
      const account = await this.accountRepository.findOne(getAccountDto);
      if (!account) throw new Error(ErrorMessages.NOT_FOUND_ACCOUNT);

      return account;
    } catch (error) {
      return error;
    }
  }

  async getAllAccounts(): Promise<AccountDto[]> {
    try {
      return await this.accountRepository.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async updateAccount(
    id: string,
    updateAccountDto: Partial<CreateAccountDto>,
  ): Promise<AccountDto> {
    try {
      return await this.accountRepository.update(id, updateAccountDto);
    } catch (error) {
      console.log({ error });
    }
  }

  async deleteAccount(id: string) {
    try {
      await this.accountRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  async alterAccountType(
    alterAccountTypeDto: AlterAccountTypeDto,
  ): Promise<AccountDto> {
    try {
      return await this.accountRepository.update(alterAccountTypeDto.id, {
        accountType: alterAccountTypeDto.type,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async withdraw(withdrawDto: WithdrawDto): Promise<{ balance: number }> {
    try {
      const account = await this.getAccount({
        accountNumber: withdrawDto.accountNumber,
      });

      if (withdrawDto.amount > account.balance) {
        throw new HttpException(ErrorMessages.INSUFICIENT_BALANCE, 400);
      }

      const updatedAccount = await this.accountRepository.update(account.id, {
        balance: account.balance - withdrawDto.amount,
      });

      return { balance: updatedAccount.balance };
    } catch (error) {
      console.error({ error });
    }
  }

  async transfer(transferDto: TransferDto): Promise<TransferReturnDto> {
    const originAccount = await this.accountRepository.findOne({
      id: transferDto.originAccountId,
    });

    const destinationAccount = await this.accountRepository.findOne(
      transferDto.destinationAccountQuery,
    );

    if (originAccount.balance < transferDto.amount)
      throw new Error(ErrorMessages.INSUFICIENT_BALANCE);

    try {
      await this.accountRepository.update(originAccount.id, {
        balance: originAccount.balance - transferDto.amount,
      });
      await this.accountRepository.update(destinationAccount.id, {
        balance: destinationAccount.balance + transferDto.amount,
      });

      return {
        senderId: originAccount.id,
        recipientId: destinationAccount.id,
        transferDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error({ error });
    }
  }

  async deposit(transactionDto: TransactionDto) {
    try {
      const destinationAccount = await this.getAccount({
        accountNumber: transactionDto.destinationAccountNumber,
      });

      await this.accountRepository.update(destinationAccount.id, {
        balance: destinationAccount.balance + transactionDto.amount,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async consultBalance(id: string): Promise<{ balance: number }> {
    try {
      const account = await this.getAccount({
        id,
      });
      return { balance: account.balance };
    } catch (error) {
      console.log(error);
    }
  }
}
