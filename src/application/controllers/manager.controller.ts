import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { IManagerService } from 'src/domain/interfaces/manager.interface';
import { ManagerBaseDto, ManagerDto, OpenAccountDto } from '../dto/manager.dto';
import { AccountDto } from '../dto/account.dto';

@Controller('manager')
export class ManagerController {
  constructor(
    @Inject('IManagerService')
    private readonly managerService: IManagerService,
    // @Inject('ICostumerService')
    // private readonly customerService: ICostumerService,
  ) {}

  @Post('create')
  async createManager(
    @Body() createManagerDto: ManagerBaseDto,
  ): Promise<ManagerDto> {
    return await this.managerService.createManager(createManagerDto);
  }

  @Get()
  async getAllManagers(): Promise<ManagerDto[]> {
    return await this.managerService.findAllManagers();
  }

  @Get(':id')
  async getOneManager(@Param() { id }: { id: string }): Promise<ManagerDto> {
    return await this.managerService.findOneManager(id);
  }

  @Post()
  async openAccount(openAccountDto: OpenAccountDto): Promise<AccountDto> {
    return await this.managerService.openAccount(openAccountDto);
  }

  @Delete(':id')
  async deleteManager(@Param() { id }: { id: string }): Promise<void> {
    return await this.managerService.deleteManager(id);
  }
}
