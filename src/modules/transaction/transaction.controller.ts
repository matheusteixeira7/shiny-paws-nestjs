import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  CreateTransactionUseCase,
  FindAllTransactionsUseCase,
  FindOneTransactionUseCase,
  RemoveTransactionUseCase,
  UpdateTransactionUseCase,
} from '../../@core/application/usecases/transaction';

@Controller('api/v1/transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly findAllTransactionsUseCase: FindAllTransactionsUseCase,
    private readonly findOneTransactionUseCase: FindOneTransactionUseCase,
    private readonly removeTransactionUseCase: RemoveTransactionUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.findAllTransactionsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneTransactionUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.updateTransactionUseCase.execute(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeTransactionUseCase.execute(id);
  }
}
