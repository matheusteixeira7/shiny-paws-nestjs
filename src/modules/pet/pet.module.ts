import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';

@Module({
  controllers: [PetController],
  providers: [],
})
export class PetModule {}
