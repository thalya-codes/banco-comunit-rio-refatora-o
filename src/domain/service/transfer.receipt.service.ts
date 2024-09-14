import { Inject, Injectable } from '@nestjs/common';
import {
  TransferReceiptBaseDto,
  TransferReceiptDto,
} from 'src/application/dto/transfer.receipt.dto';
import {
  ITransferReceiptRepository,
  ITransferReceiptService,
} from '../interfaces/transfer.receipt.interface';

@Injectable()
export class TransferReceiptService implements ITransferReceiptService {
  constructor(
    @Inject('ITransferReceiptRepository')
    private readonly transferReceiptRepository: ITransferReceiptRepository,
  ) {}

  async createReceipt(
    createTransferDto: Omit<TransferReceiptBaseDto, 'transferDate'>,
  ): Promise<TransferReceiptDto> {
    return await this.transferReceiptRepository.create({
      ...createTransferDto,
      transferDate: new Date().toISOString(),
    });
  }

  async getReceiptById(id: string): Promise<TransferReceiptDto> {
    return await this.transferReceiptRepository.findOne(id);
  }
}
