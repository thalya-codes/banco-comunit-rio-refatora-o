import { Injectable } from '@nestjs/common';
import { CreatePixKeyDto } from 'src/application/dto/pix.dto';
import { PixKeyType } from 'src/domain/enums/business.enum';
import { IPixPaymentModel } from 'src/domain/interfaces/pix.interface';
//GERAL: Criar uma factory para um payment

//como faço para utilizar um service em outra class?
//injeto no construtor
//TODO: Caso for utilizar algo externo para gerar a chave pix, pensar em qual camada isto deve ser implementado
@Injectable()
export class PixPayment implements IPixPaymentModel {
  async createPixKey(
    createPixKeyDto: CreatePixKeyDto,
  ): Promise<string | number> {
    if(createPixKeyDto.pixKeyType === PixKeyType.RANDOM) //gerar chave

    //se o tipo de key for random --> gerar chave aleatória
    //checar se a chave desejada ou gerada já existe na base de dado
    //se existir lançar excessão
    //se não existir, add a nova chave a lista de chaves da conta e  retornar mensagem de sucesso
  }
  //gerar uma chave pix -> tipo de chave , verificar se ela já existe, armazenar chave criada
  //realizar um pagamento com pix -. operação é de transferência e apenas o método de pagamento muda
}
