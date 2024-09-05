// import { Injectable } from '@nestjs/common';
// import { CreatePixKeyDto, ProcessPixDto } from 'src/application/dto/pix.dto';
// import { PixKeyType } from 'src/domain/enums/business.enum';
// import { ErrorMessages } from 'src/domain/enums/error-messages.enum';
// import { IAccountRepository } from 'src/domain/interfaces/account.interface';
// import { IPixPaymentModel } from 'src/domain/interfaces/pix.interface';
// import { v3 as uuidv3 } from 'uuid';

// @Injectable()
// export class PixPayment implements IPixPaymentModel {
//   async createPixKey(
//     accountRepository: IAccountRepository,
//     createPixKeyDto: CreatePixKeyDto,
//   ): Promise<string | number> {
//     const account = await accountRepository.findOne({
//       accountNumber: createPixKeyDto.accountNumber,
//     });

//     if (createPixKeyDto.key_type === PixKeyType.RANDOM) {
//       const randomKey: string = uuidv3() as unknown as string;
//       accountRepository.save(account);
//       return randomKey;
//     }
//   }

//   async processPix(
//     accountRepository: IAccountRepository,
//     processPixDto: ProcessPixDto,
//   ) {
//     const originAccount = await accountRepository.findOne({
//       id: processPixDto.originAccountId,
//     });

//     const destinationAccount = await accountRepository.findOne({
//       pix_keys: processPixDto.destinationPixKey,
//     });

//     console.log({ destinationAccount });

//     if (originAccount.balance < processPixDto.amount)
//       throw new Error(ErrorMessages.INSUFICIENT_BALANCE);

//     try {
//       await accountRepository.update(originAccount.id, {
//         balance: originAccount.balance - processPixDto.amount,
//       });
//       await accountRepository.update(destinationAccount.id, {
//         balance: destinationAccount.balance + processPixDto.amount,
//       });
//     } catch (error) {}
//   }
// }

//gerar uma chave pix -> tipo de chave , verificar se ela já existe, armazenar chave criada
//realizar um pagamento com pix -. operação é de transferência e apenas o método de pagamento muda

//gerar chave

//se o tipo de key for random --> gerar chave aleatória
//checar se a chave desejada ou gerada já existe na base de dado
//se existir lançar excessão
//se não existir, add a nova chave a lista de chaves da conta e  retornar mensagem de sucesso

//GERAL: Criar uma factory para um payment

//como faço para utilizar um service em outra class?
//injeto no construtor
//TODO: Caso for utilizar algo externo para gerar a chave pix, pensar em qual camada isto deve ser implementado

/*
  da forma como está aqui, sem integração com db o método de criar chaves esta sendo utilizado apenas para gerar uma chave random, mas no futuro
  eu posso melhorar este método adicionando validações para os outros tipos de chaves.
*/
