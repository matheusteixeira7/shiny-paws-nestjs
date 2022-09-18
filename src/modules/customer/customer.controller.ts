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
  CreateCustomerUseCase,
  FindAllCustomersUseCase,
  FindOneCustomerUseCase,
  RemoveCustomerUseCase,
  UpdateCustomerUseCase,
} from '../../@core/application/usecases/customer';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('api/v1/customers')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findAllCustomersUseCase: FindAllCustomersUseCase,
    private readonly findOneCustomerUseCase: FindOneCustomerUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly removeCustomerUseCase: RemoveCustomerUseCase,
  ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.createCustomerUseCase.execute(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.findAllCustomersUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneCustomerUseCase.execute({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.updateCustomerUseCase.execute(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeCustomerUseCase.execute({ id });
  }
}
