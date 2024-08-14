import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostumerEntity } from 'src/domain/entities/costumer.entity';
import { ICostumerRepository } from 'src/domain/interfaces/costumer.interface';
import {
  CostumerDto,
  CreateCostumerDto,
  UpdateCostumerDto,
} from 'src/application/dto/costumer.dto';
import { ErrorMessages } from 'src/domain/enums/error-messages.enum';
import { TCostumerDtoOrNull } from 'src/domain/types/costumer.type';

@Injectable()
export class CostumerRepository implements ICostumerRepository {
  constructor(
    @InjectRepository(CostumerEntity)
    private readonly costumerRepository: Repository<CostumerEntity>,
  ) {}

  async create(
    createCostumerDto: CreateCostumerDto,
  ): Promise<TCostumerDtoOrNull> {
    const entity = this.costumerRepository.create(createCostumerDto);
    return await this.costumerRepository.save(entity);
  }

  async findOne(id: string): Promise<CostumerDto> {
    return await this.costumerRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<CostumerDto[]> {
    return await this.costumerRepository.find();
  }

  async delete(id: string) {
    if (!id) throw new Error(ErrorMessages.ID_NOT_GIVEN);
    await this.costumerRepository.delete({ id });
  }

  async update(
    id: string,
    updateCostumerDto: UpdateCostumerDto,
  ): Promise<CostumerDto> {
    await this.costumerRepository.update(id, updateCostumerDto);
    return await this.costumerRepository.findOne({ where: { id } });
  }
}
