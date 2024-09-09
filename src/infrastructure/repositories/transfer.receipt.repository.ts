import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITransferReceiptRepository } from 'src/domain/interfaces/transfer.receipt.interface';
import { TransferReceiptEntity } from 'src/domain/entities/transfer.entity';
import {
  TransferReceiptBaseDto,
  TransferReceiptDto,
} from 'src/application/dto/transfer-receipt.dto';

@Injectable()
export class TransferReceiptRepository implements ITransferReceiptRepository {
  constructor(
    @InjectRepository(TransferReceiptEntity)
    private readonly transferReceiptRepository: Repository<TransferReceiptEntity>,
  ) {}

  async create(
    createReceiptDto: TransferReceiptBaseDto,
  ): Promise<TransferReceiptDto | null> {
    const receipt = this.transferReceiptRepository.create(createReceiptDto);
    return await this.transferReceiptRepository.save(receipt);
  }

  async delete(id: string): Promise<void> {
    await this.transferReceiptRepository.delete(id);
  }

  async findOne(senderId: string): Promise<TransferReceiptDto> {
    return await this.transferReceiptRepository.findOneByOrFail({ senderId });
  }

  async findAllBySender(senderId: string): Promise<TransferReceiptDto> {
    return await this.transferReceiptRepository.findOneByOrFail({ senderId });
  }

  async save(receipt: TransferReceiptDto): Promise<TransferReceiptDto> {
    return await this.transferReceiptRepository.save(receipt);
  }
}
