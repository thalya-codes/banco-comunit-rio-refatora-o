import { Inject, Injectable } from '@nestjs/common';
import {
  IManagerRepository,
  IManagerService,
} from '../interfaces/manager.interface';
import { ManagerBaseDto, ManagerDto } from 'src/application/dto/manager.dto';
import { AccountType } from '../enums/business.enum';
import { ICostumerService } from '../interfaces/costumer.interface';
import { IAccountService } from '../interfaces/account.interface';
import {
  AccountDto,
  AlterAccountTypeDto,
  CreateAccountDto,
} from 'src/application/dto/account.dto';
import {
  CostumerDto,
  CreateCostumerDto,
} from 'src/application/dto/costumer.dto';
import { ErrorMessages } from '../enums/error-messages.enum';

@Injectable()
export class ManagerService implements IManagerService {
  constructor(
    @Inject('ICostumerService')
    private readonly customerService: ICostumerService,
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
    @Inject('IManagerRepository')
    private readonly managerRepository: IManagerRepository,
  ) {}

  async createManager(createManagerDto: ManagerBaseDto): Promise<ManagerDto> {
    return await this.managerRepository.create(createManagerDto);
  }

  async findAllManagers(): Promise<ManagerDto[]> {
    return await this.managerRepository.findAll();
  }

  async findOneManager(id: string): Promise<ManagerDto> {
    return await this.managerRepository.findOne(id);
  }

  async deleteManager(id: string): Promise<void> {
    return await this.managerRepository.delete(id);
  }

  async addCustomer(addCustomerDto: CreateCostumerDto): Promise<CostumerDto> {
    return await this.customerService.createCostumer(addCustomerDto);
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

  async removeCustomer(id: string): Promise<void> {
    return await this.customerService.deleteCostumer(id);
  }

  async changeAccountType(
    changeAccountTypeDto: AlterAccountTypeDto,
  ): Promise<AccountDto> {
    const account = await this.accountService.getAccount({
      id: changeAccountTypeDto.id,
    });

    if (!account) throw new Error(ErrorMessages.NOT_FOUND_ACCOUNT);

    if (changeAccountTypeDto.type === AccountType.CHECKING) {
      const customer = await this.customerService.findCostumerById(account.id);

      if (!customer) throw new Error('Customer not found');

      if (customer.salaryIncome < 500) {
        throw new Error(
          'Only is possible have checking account if the customer salary is more than R$ 500.00',
        );
      }
    }

    console.log(
      'changeAccountTypeDto.newAccountType: ',
      changeAccountTypeDto.type,
    );
    return await this.accountService.updateAccount(changeAccountTypeDto.id, {
      accountType: changeAccountTypeDto.type,
    });
  }
}
