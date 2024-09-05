import { Inject, Injectable } from '@nestjs/common';
import {
  IManagerRepository,
  IManagerService,
} from '../interfaces/manager.interface';
import { ManagerBaseDto, ManagerDto } from 'src/application/dto/manager.dto';
import { AccountType } from '../enums/business.enum';
import { ICostumerService } from '../interfaces/costumer.interface';
import { IAccountService } from '../interfaces/account.interface';
import { AccountDto, CreateAccountDto } from 'src/application/dto/account.dto';
import {
  CostumerDto,
  CreateCostumerDto,
} from 'src/application/dto/costumer.dto';

@Injectable()
export class ManagerService implements IManagerService {
  constructor(
    @Inject('ICostumerService')
    private readonly customerService: ICostumerService,
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
    @Inject('ICostumerRepository')
    private readonly managerRepository: IManagerRepository,
  ) {}

  async createManager(createManagerDto: ManagerBaseDto): Promise<ManagerDto> {
    return await this.managerRepository.create(createManagerDto);
  }

  async addCustomer(addCustomerDto: CreateCostumerDto): Promise<CostumerDto> {
    return await this.customerService.createCostumer(addCustomerDto);
  }

  async findOneManager(id: string): Promise<CostumerDto> {
    return await this.customerService.findCostumerById(id);
  }

  async openAccount(openAccountDto: CreateAccountDto): Promise<AccountDto> {
    const customer = await this.customerService.findCostumerById(
      openAccountDto.customerId,
    );

    if (!customer) throw new Error('Customer not founds');

    const manager = this.findOneManager(openAccountDto.managerId);

    if (!manager) throw new Error('Manager not found');

    if (
      customer.salaryIncome < 500 &&
      openAccountDto.accountType === AccountType.CHECKING
    ) {
      throw new Error(
        'Only is possible create checking account if the customer salary is more than R$ 500.00',
      );
    }

    return await this.accountService.createAccount(openAccountDto);
  }
}
