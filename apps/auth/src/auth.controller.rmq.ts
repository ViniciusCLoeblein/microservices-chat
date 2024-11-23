import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from 'apps/gateway/src/auth/dto/register.dto';
import { LoginDto } from 'apps/gateway/src/auth/dto/login.dto';
import { IExceptionFilter } from 'apps/generics/filters/IExceptionFilterGrpc';

@Controller()
export class AuthControllerRMQ {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'Auth.Teste' })
  teste(): Promise<any> {
    return this.authService.teste();
  }

  @MessagePattern({ cmd: 'Auth.Register' })
  @UseFilters(IExceptionFilter)
  register(data: RegisterDto): Promise<any> {
    return this.authService.register(data);
  }

  @MessagePattern({ cmd: 'Auth.Login' })
  @UseFilters(IExceptionFilter)
  login(data: LoginDto): Promise<any> {
    return this.authService.login(data);
  }
}
