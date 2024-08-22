import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  IAccountRepository,
  IAccountService,
} from '../interfaces/account.interface';
import {
  AccountDto,
  AccountNumberDto,
  AmountDto,
  DepositDto,
  IdDto,
  TransactionDto,
  TransferDto,
  WithdrawDto,
} from 'src/application/dto/account.dto';
import { ErrorMessages } from '../enums/error-messages.enum';

//operações -> update manager
//operações -> update manager
@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async getAccount(
    getAccountDto: AccountNumberDto | IdDto,
  ): Promise<AccountDto> {
    try {
      const account = await this.accountRepository.findOne(getAccountDto);
      if (!account) throw new Error(ErrorMessages.NOT_FOUND_ACCOUNT);

      return account;
    } catch (error) {
      return error;
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

  //conta de destino
  //targetAccount
  //originAccount
  //a forma como deposito sera feito(via pix(transferência(chave pix / número da conta)) ou boleto)
  //TODO: Decidir formato do retorno
  async deposit(transactionDto: TransactionDto): Promise<{ balance: number }> {
    try {
      const originAccount = await this.getAccount({
        accountNumber: transactionDto.originAccountNumber,
      });

      const destinationAccount = await this.getAccount({
        accountNumber: transactionDto.destinationAccountNumber,
      });

      if (originAccount.balance < transactionDto.amount)
        throw new Error(ErrorMessages.INSUFICIENT_BALANCE);

      const updatedOriginAccount = await this.accountRepository.update(
        originAccount.id,
        { balance: originAccount.balance - transactionDto.amount },
      );

      const destinationOriginAccount = await this.accountRepository.update(
        destinationAccount.id,
        { balance: destinationAccount.balance + transactionDto.amount },
      );
    } catch (error) {
      console.log(error);
    }
  }

  async consultBalance(
    accountNumberDto: AccountNumberDto | IdDto,
  ): Promise<{ balance: number }> {
    const account = await this.getAccount({
      accountNumber: accountNumberDto.accountNumber,
    });
    return { balance: account.balance };
  }

  //Tipos de pagamento
  //a diferença entre o pix e o boleto é quando o valor estará disponível na conta de destino
  //em caso de transferência com chave pix é necessário informar a chave pix da conta de destino e o número da conta de origem
  //e em caso de boleto é necessário passar o número do boleto
  async transfer(transferDto: TransferDto): Promise<{ balance: number }> {}
}
