import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerDto, ManagerBaseDto } from 'src/application/dto/manager.dto';
import { ManagerEntity } from 'src/domain/entities/manager.entity';
import { ErrorMessages } from 'src/domain/enums/error-messages.enum';
import { IManagerRepository } from 'src/domain/interfaces/manager.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerRepository implements IManagerRepository {
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly managerRepository: Repository<ManagerEntity>,
  ) {}

  async create(createManagerDto: ManagerBaseDto): Promise<ManagerDto | null> {
    const entity = this.managerRepository.create(createManagerDto);
    return await this.managerRepository.save(entity);
  }

  async findOne(id: string): Promise<ManagerDto> {
    return await this.managerRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<ManagerDto[]> {
    return await this.managerRepository.find();
  }

  async delete(id: string) {
    if (!id) throw new Error(ErrorMessages.ID_NOT_GIVEN);
    await this.managerRepository.delete({ id });
  }

  //TODO: Verificar se a validação está funcionando
  async update(
    id: string,
    updateManagerDto: Partial<ManagerBaseDto>,
  ): Promise<ManagerDto> {
    await this.managerRepository.update(id, updateManagerDto);
    return await this.managerRepository.findOne({ where: { id } });
  }
}
