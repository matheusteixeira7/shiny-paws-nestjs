import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePetUseCase } from '../../@core/application/usecases/pet';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('api/v1/pets')
export class PetController {
  constructor(private readonly createPetUseCase: CreatePetUseCase) {}

  @Post(':id')
  create(@Param('id') id: string, @Body() createPetDto: CreatePetDto) {
    return this.createPetUseCase.execute(id, createPetDto);
  }

  // @Get()
  // findAll() {}

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.petService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
  //   return this.petService.update(+id, updatePetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.petService.remove(+id);
  // }
}
