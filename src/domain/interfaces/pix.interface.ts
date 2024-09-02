import { CreatePixKeyDto, ProcessPixDto } from 'src/application/dto/pix.dto';
import { IAccountRepository } from './account.interface';

export interface IPixPaymentModel {
  createPixKey(createPixKeyDto: CreatePixKeyDto): Promise<string | number>; //retornar chave criada
  processPix(
    accountRepository: IAccountRepository,
    processPixDto: ProcessPixDto,
  ): void; //retornar comprovan
}
