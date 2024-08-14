import { Injectable, Inject } from '@nestjs/common';
import {
  ICostumerRepository,
  ICostumerService,
} from '../interfaces/costumer.interface';
import {
  CreateCostumerDto,
  CostumerDto,
  UpdateCostumerDto,
} from 'src/application/dto/costumer.dto';
import { ErrorMessages } from '../enums/error-messages.enum';
import { TCostumerDtoOrNull } from '../types/costumer.type';

@Injectable()
export class CostumerService implements ICostumerService {
  constructor(
    @Inject('ICostumerRepository')
    private readonly costumerRepository: ICostumerRepository,
  ) {}

  async createCostumer(
    createCostumerDto: CreateCostumerDto,
  ): Promise<TCostumerDtoOrNull> {
    return await this.costumerRepository.create(createCostumerDto);
  }

  async findCostumerById(id: string): Promise<CostumerDto> {
    if (!id) throw new Error(ErrorMessages.ID_NOT_GIVEN);

    return await this.costumerRepository.findOne(id);
  }

  async findAllCostumers(): Promise<CostumerDto[]> {
    return await this.costumerRepository.findAll();
  }

  async updateCostumer(
    id: string,
    updateCostumerDto: UpdateCostumerDto,
  ): Promise<UpdateCostumerDto> {
    if (!id) throw new Error(ErrorMessages.ID_NOT_GIVEN);
    await this.costumerRepository.update(id, updateCostumerDto);

    return await this.costumerRepository.findOne(id);
  }

  async deleteCostumer(id: string): Promise<void> {
    if (!id) throw new Error(ErrorMessages.ID_NOT_GIVEN);

    return await this.costumerRepository.delete(id);
  }
}
