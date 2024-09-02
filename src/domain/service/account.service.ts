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
  WithdrawDto,
} from 'src/application/dto/account.dto';
import { ErrorMessages } from '../enums/error-messages.enum';
import { v4 as uuidv4 } from 'uuid';
import { PaymentFactory } from '../factories/payment.factory';
import { PixPayment } from '../models/payment/pix.payment.model';

//operações -> update manager
//operações -> update manager
@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  //[x] generate account number
  //criar class de payment
  //criar variações p/ savings e checking
  //criar modelo de retorno padrão
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
        accountType: alterAccountTypeDto.newAccountType,
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
      return error;
    }
  }

  //destinationQuerySearchParam
  //

  /*
    Pagamento por boleto
     -  conta de origem
     -  conta de destino
     -  número do boleto
     -  vencimento
     -  valor a ser pago/transferido
  */

  /*
      Pagamento por PIX 
        - conta de origem
        - chave pix da conta de destino
        - valor a ser transferido
    */
  async transfer(transferDto: any) {
    const pixPayment = new PixPayment();
    await pixPayment.processPix(this.accountRepository, transferDto);
  }

  async deposit(transactionDto: TransactionDto) {
    try {
      const originAccount = await this.getAccount({
        accountNumber: transactionDto.originAccountNumber,
      });

      const destinationAccount = await this.getAccount({
        accountNumber: transactionDto.destinationAccountNumber,
      });

      if (originAccount.balance < transactionDto.amount)
        throw new Error(ErrorMessages.INSUFICIENT_BALANCE);

      await this.accountRepository.update(originAccount.id, {
        balance: originAccount.balance - transactionDto.amount,
      });

      await this.accountRepository.update(destinationAccount.id, {
        balance: destinationAccount.balance + transactionDto.amount,
      });
      //todo retornar comprovante de deposito
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

  //TODO: Implementar após criar a classe de pagamento
  //Tipos de pagamento
  //a diferença entre o pix e o boleto é quando o valor estará disponível na conta de destino
  //em caso de transferência com chave pix é necessário informar a chave pix da conta de destino e o número da conta de origem
  //e em caso de boleto é necessário passar o número do boleto
  // async transfer(transferDto: TransferDto): Promise<{ balance: number }> {}
}
