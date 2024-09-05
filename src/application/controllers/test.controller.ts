import { Body, Controller, Inject } from '@nestjs/common';
import { Teste } from 'src/domain/entities/teste.entity';
import { TesteService } from 'src/domain/service/teste.service';

@Controller('teste')
export class TesteController {
  constructor(@Inject(Teste) private readonly testeService: 










) {}

  async create(@Body() dados: any): Promise<any> {
    return await this.testeService.create(dados);
  }
}
