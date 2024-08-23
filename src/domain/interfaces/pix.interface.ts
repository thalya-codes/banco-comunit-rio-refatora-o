import { CreatePixKeyDto, ProcessPixDto } from 'src/application/dto/pix.dto';

export interface IPixPaymentModel {
  createPixKey(createPixKeyDto: CreatePixKeyDto): Promise<string | number>; //retornar chave criada
  processPix(processPixDto: ProcessPixDto): void; //retornar comprovan
}
