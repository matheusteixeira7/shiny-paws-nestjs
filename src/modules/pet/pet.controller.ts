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
  CreatePetUseCase,
  FindAllPetsUseCase,
  FindOnePetUseCase,
  RemovePetUseCase,
  UpdatePetUseCase,
} from '../../@core/application/usecases/pet';
import { CreatePetDto, UpdatePetDto } from './dto';

@Controller('api/v1/pets')
export class PetController {
  constructor(
    private readonly createPetUseCase: CreatePetUseCase,
    private readonly findAllPetsUseCase: FindAllPetsUseCase,
    private readonly findOnePetUseCase: FindOnePetUseCase,
    private readonly updatePetUseCase: UpdatePetUseCase,
    private readonly deletePetUseCase: RemovePetUseCase,
  ) {}

  @Post(':id')
  create(@Param('id') id: string, @Body() createPetDto: CreatePetDto) {
    return this.createPetUseCase.execute(id, createPetDto);
  }

  @Get()
  findAll() {
    return this.findAllPetsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOnePetUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.updatePetUseCase.execute(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deletePetUseCase.execute(id);
  }
}
