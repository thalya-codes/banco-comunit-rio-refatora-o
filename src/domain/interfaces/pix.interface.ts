import { CreatePixKeyDto, ProcessPixDto } from 'src/application/dto/pix.dto';
import { AccountDto } from 'src/application/dto/account.dto';
import { TransferReceiptDto } from 'src/application/dto/transfer-receipt.dto';

export interface IPixService {
  createKey(createPixKeyDto: CreatePixKeyDto): Promise<AccountDto>; //retornar chave criada
  processPix(processPixDto: ProcessPixDto): Promise<TransferReceiptDto>; //retornar comprovan
}
