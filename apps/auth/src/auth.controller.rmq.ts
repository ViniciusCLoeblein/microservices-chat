import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from 'apps/gateway/src/auth/dto/register.dto';
import { LoginDto } from 'apps/gateway/src/auth/dto/login.dto';

@Controller()
export class AuthControllerRMQ {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'Auth.Teste' })
  teste(): Promise<any> {
    return this.authService.teste();
  }

  @MessagePattern({ cmd: 'Auth.Register' })
  register(data: RegisterDto): Promise<any> {
    return this.authService.register(data);
  }

  @MessagePattern({ cmd: 'Auth.Login' })
  login(data: LoginDto): Promise<any> {
    return this.authService.login(data);
  }
}
