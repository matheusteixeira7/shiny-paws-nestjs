import { Module } from '@nestjs/common';

import { CustomerModule } from './modules/customer/customer.module';
import { PetModule } from './modules/pet/pet.module';
import { ServiceModule } from './modules/service/service.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, CustomerModule, PetModule, ServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
