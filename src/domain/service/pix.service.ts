import { Inject, Injectable } from '@nestjs/common';
import { IAccountRepository } from '../interfaces/account.interface';
import { CreatePixKeyDto, ProcessPixDto } from 'src/application/dto/pix.dto';
import { PixKeyType } from '../enums/business.enum';
import { v4 as uuidv4 } from 'uuid';
import { ErrorMessages } from '../enums/error-messages.enum';
import { IPixService } from '../interfaces/pix.interface';
import { AccountDto } from 'src/application/dto/account.dto';

@Injectable()
export class PixService implements IPixService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async createKey(createPixKeyDto: CreatePixKeyDto): Promise<AccountDto> {
    const account = await this.accountRepository.findOne({
      accountNumber: createPixKeyDto.accountNumber,
    });

    if (createPixKeyDto.key_type === PixKeyType.RANDOM) {
      const randomKey: string = uuidv4() as unknown as string;
      const keys = account.pix_keys || ([] as unknown as any);
      keys.push(randomKey);

      return await this.accountRepository.save(account);
    }
  }

  async processPix(processPixDto: ProcessPixDto) {
    const originAccount = await this.accountRepository.findOne({
      id: processPixDto.originAccountId,
    });

    const destinationAccount = await this.accountRepository.findOne({
      pix_keys: processPixDto.destinationPixKey,
    });

    console.log({ destinationAccount });

    if (originAccount.balance < processPixDto.amount)
      throw new Error(ErrorMessages.INSUFICIENT_BALANCE);

    try {
      await this.accountRepository.update(originAccount.id, {
        balance: originAccount.balance - processPixDto.amount,
      });
      await this.accountRepository.update(destinationAccount.id, {
        balance: destinationAccount.balance + processPixDto.amount,
      });
    } catch (error) {}
  }
}
