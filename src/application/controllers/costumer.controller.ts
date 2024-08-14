import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ICostumerService } from 'src/domain/interfaces/costumer.interface';
import { TIdParam } from 'src/domain/types/shared.type';
import {
  CostumerDto,
  CreateCostumerDto,
  UpdateCostumerDto,
} from '../dto/costumer.dto';

//TODO: Adicionar tratamentos de erro e validações mais específicas
@Controller('costumer')
export class CostumerController {
  constructor(
    @Inject('ICostumerService')
    private readonly costumerService: ICostumerService,
  ) {}

  @Post()
  async createCostumer(
    @Body() createCostumer: CreateCostumerDto,
  ): Promise<CostumerDto> {
    return await this.costumerService.createCostumer(createCostumer);
  }

  @Get()
  async findAllCostumers() {
    return this.costumerService.findAllCostumers();
  }

  @Get(':id')
  async findCostumerById(@Param() { id }: TIdParam) {
    return await this.costumerService.findCostumerById(id);
  }

  @Put(':id')
  async updateCostumer(
    @Param() { id }: TIdParam,
    @Body() updateCostumerDto: UpdateCostumerDto,
  ) {
    return await this.costumerService.updateCostumer(id, updateCostumerDto);
  }

  @Delete(':id')
  async deleteCostumer(@Param() { id }: TIdParam) {
    return await this.costumerService.deleteCostumer(id);
  }
}
