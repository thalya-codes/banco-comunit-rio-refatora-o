import {
  CostumerDto,
  CreateCostumerDto,
} from 'src/application/dto/costumer.dto';
import { AccountType } from '../enums/business.enum';
import { CloseAccountDto, OpenAccountDto } from 'src/application/dto/manager.dto';

export interface IManagerService {
  createManager;
  findOneManager;
  findAllManager;
  deleteManager;
  updateManager;

  getCustomer(id: string): CostumerDto; //DO ID DO CLIENTE
  addCustomer(customerDto: CreateCostumerDto): void;
  removeCustomer(id: string): void;
  openAccount(openAccountDto: OpenAccountDto): void; //
  closeAccount(closeAccountDto: CloseAccountDto): void;
  alterAccountType(
    client: Customer,
    account: AccountAbstract,
    newType: string,
  ): void;
}
