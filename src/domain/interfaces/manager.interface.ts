import {
  AccountDto,
  AlterAccountTypeDto,
} from 'src/application/dto/account.dto';
import {
  CostumerDto,
  CreateCostumerDto,
} from 'src/application/dto/costumer.dto';
import {
  ManagerDto,
  ManagerBaseDto,
  OpenAccountDto,
} from 'src/application/dto/manager.dto';

export interface IManagerRepository {
  create(createManagerDto: ManagerBaseDto): Promise<ManagerDto | null>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    updateManagerDto: Partial<ManagerBaseDto>,
  ): Promise<ManagerDto>;
  findAll(): Promise<ManagerDto[]>;
  findOne(id: string): Promise<ManagerDto>;
}

export interface IManagerService {
  // findAllManager;
  // deleteManager;
  // updateManager;

  createManager(createManagerDto: ManagerBaseDto): Promise<ManagerDto>;
  findAllManagers(): Promise<ManagerDto[]>;
  findOneManager(id: string): Promise<ManagerDto>;
  deleteManager(id: string): Promise<void>;

  // getCustomer(id: string): ManagerDto; //DO ID DO CLIENTE
  addCustomer(customerDto: CreateCostumerDto): Promise<CostumerDto>;
  removeCustomer(id: string): Promise<void>;
  openAccount(openAccountDto: OpenAccountDto): Promise<AccountDto>; //
  changeAccountType(
    changeAccountTypeDto: AlterAccountTypeDto,
  ): Promise<AccountDto>;
  // closeAccount(closeAccountDto: CloseAccountDto): void;
  // alterAccountType(
  //   client: ManagerDto,
  //   account: AccountDto,
  //   newType: string,
  // ): void;
}
