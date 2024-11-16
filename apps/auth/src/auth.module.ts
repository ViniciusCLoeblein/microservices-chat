import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDatabaseService } from 'apps/generics/database';
import { AuthControllerRMQ } from './auth.controller.rmq';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { User } from 'apps/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return new PostgresDatabaseService('AUTH', config).getConnectionPostgres();
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthControllerRMQ],
  providers: [
    AuthRepository,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}