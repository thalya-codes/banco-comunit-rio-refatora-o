import {
  CostumerDto,
  CreateCostumerDto,
  UpdateCostumerDto,
} from 'src/application/dto/costumer.dto';
import { TCostumerDtoOrNull } from '../types/costumer.type';

export interface ICostumerRepository {
  create(createCostumerDto: CreateCostumerDto): Promise<TCostumerDtoOrNull>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    updateCostumerDto: UpdateCostumerDto,
  ): Promise<CostumerDto>;
  findAll(): Promise<CostumerDto[]>;
  findOne(id: string): Promise<CostumerDto>;
}
export interface ICostumerService {
  createCostumer(
    createCostumerDto: CreateCostumerDto,
  ): Promise<TCostumerDtoOrNull>;
  deleteCostumer(id: string): Promise<void>;
  updateCostumer(
    id: string,
    updateCostumerDto: UpdateCostumerDto,
  ): Promise<UpdateCostumerDto>;
  findAllCostumers(): Promise<CostumerDto[]>;
  findCostumerById(id: string): Promise<CostumerDto>;
}
