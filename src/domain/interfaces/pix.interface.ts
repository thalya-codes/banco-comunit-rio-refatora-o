import { CreatePixKeyDto, ProcessPixDto } from 'src/application/dto/pix.dto';
import { AccountDto } from 'src/application/dto/account.dto';

export interface IPixService {
  createKey(createPixKeyDto: CreatePixKeyDto): Promise<AccountDto>; //retornar chave criada
  processPix(processPixDto: ProcessPixDto): void; //retornar comprovan
}
