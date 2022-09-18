import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
