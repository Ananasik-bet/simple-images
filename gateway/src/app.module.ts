import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot(), ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
