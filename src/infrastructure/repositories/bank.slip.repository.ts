import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  FindBankSlipTransferByBarcodeDto,
  FindBankSlipTransferByNumberDto,
  FindBankSlipTransferBySenderDto,
} from 'src/application/dto/bank.splip.transfer.receipt.dto';
import { BankSlipEntity } from 'src/domain/entities/bank.slip.entity';
import {
  BankSplipBaseDto,
  BankSplipDto,
} from 'src/application/dto/bank.slip.dto';
import { IBankSlipRepository } from 'src/domain/interfaces/bank.splip.interface';

@Injectable()
export class BankSlipRepository implements IBankSlipRepository {
  constructor(
    @InjectRepository(BankSlipEntity)
    private readonly bankSlipRepository: Repository<BankSlipEntity>,
  ) {}

  async create(createDto: BankSplipBaseDto): Promise<BankSplipDto> {
    console.log({ createDto });
    const bankSlip = this.bankSlipRepository.create(createDto);
    return await this.bankSlipRepository.save(bankSlip);
  }

  async delete(id: string): Promise<void> {
    await this.bankSlipRepository.delete(id);
  }

  async findAll(): Promise<BankSplipDto[]> {
    return await this.bankSlipRepository.find();
  }

  async findOne(
    query:
      | FindBankSlipTransferByNumberDto
      | FindBankSlipTransferByBarcodeDto
      | FindBankSlipTransferBySenderDto,
  ): Promise<BankSplipDto> {
    return await this.bankSlipRepository.findOneByOrFail(query);
  }

  async findAllBySender(senderId: string): Promise<BankSplipDto[]> {
    return await this.bankSlipRepository.find({ where: { senderId } });
  }

  async save(bankSlip: BankSplipBaseDto): Promise<BankSplipDto> {
    return await this.bankSlipRepository.save(bankSlip);
  }
}
