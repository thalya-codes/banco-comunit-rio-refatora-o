import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BankSlipTransferReceiptEntity } from 'src/domain/entities/bank.splip.transfer.receipt.entity';
import {
  BankSlipTransferReceiptBaseDto,
  BankSlipTransferReceiptDto,
  FindBankSlipTransferByBarcodeDto,
  FindBankSlipTransferByNumberDto,
  FindBankSlipTransferBySenderDto,
} from 'src/application/dto/bank.splip.transfer.receipt.dto';
import { IBankSlipTransferReceiptRepository } from 'src/domain/interfaces/bank.slip.transfer.receipt.interface';

@Injectable()
export class BankSlipTransferReceiptRepository
  implements IBankSlipTransferReceiptRepository
{
  constructor(
    @InjectRepository(BankSlipTransferReceiptEntity)
    private readonly transferReceiptRepository: Repository<BankSlipTransferReceiptEntity>,
  ) {}

  async create(
    createReceiptDto: BankSlipTransferReceiptBaseDto,
  ): Promise<BankSlipTransferReceiptDto | null> {
    const receipt = this.transferReceiptRepository.create(createReceiptDto);
    return await this.transferReceiptRepository.save(receipt);
  }

  async delete(id: string): Promise<void> {
    await this.transferReceiptRepository.delete(id);
  }

  async findOne(
    query:
      | FindBankSlipTransferByNumberDto
      | FindBankSlipTransferByBarcodeDto
      | FindBankSlipTransferBySenderDto,
  ): Promise<BankSlipTransferReceiptDto> {
    return await this.transferReceiptRepository.findOneByOrFail(query);
  }

  async findAllBySender(senderId: string): Promise<BankSlipTransferReceiptDto> {
    return await this.transferReceiptRepository.findOneByOrFail({ senderId });
  }

  async save(
    receipt: BankSlipTransferReceiptDto,
  ): Promise<BankSlipTransferReceiptDto> {
    return await this.transferReceiptRepository.save(receipt);
  }
}
