import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateServiceUseCase,
  FindAllServicesUseCase,
  FindOneServiceUseCase,
  RemoveServiceUseCase,
  UpdateServiceUseCase,
} from '../../@core/application/usecases/service';
import { CreateServiceDto, UpdateServiceDto } from './dto';

@Controller('api/v1/services')
export class ServiceController {
  constructor(
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly findAllServicesUseCase: FindAllServicesUseCase,
    private readonly findOneServiceUseCase: FindOneServiceUseCase,
    private readonly updateServiceUseCase: UpdateServiceUseCase,
    private readonly removeServiceUseCase: RemoveServiceUseCase,
  ) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.createServiceUseCase.execute(createServiceDto);
  }

  @Get()
  findAll() {
    return this.findAllServicesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneServiceUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.updateServiceUseCase.execute(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeServiceUseCase.execute(id);
  }
}
