import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { IAccountRepository } from 'src/domain/interfaces/account.interface';
import {
  AccountDto,
  CreateAccountDto,
  UpdateAccountDto,
} from 'src/application/dto/account.dto';
import { ErrorMessages } from 'src/domain/enums/error-messages.enum';

type FindOneDto = { accountNumber: string } | { id: string };
@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  //TODO: Verificar se a validação está funcionando
  async create(createAccountDto: CreateAccountDto): Promise<AccountDto | null> {
    const entity = this.accountRepository.create(createAccountDto);
    return await this.accountRepository.save(entity);
  }

  async findOne(query: FindOneDto): Promise<AccountDto> {
    return await this.accountRepository.findOne({ where: query });
  }

  async findAll(): Promise<AccountDto[]> {
    return await this.accountRepository.find();
  }

  async delete(id: string) {
    if (!id) throw new Error(ErrorMessages.ID_NOT_GIVEN);
    await this.accountRepository.delete({ id });
  }

  //TODO: Verificar se a validação está funcionando
  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<AccountDto> {
    await this.accountRepository.update(id, updateAccountDto);
    return await this.accountRepository.findOne({ where: { id } });
  }
}
