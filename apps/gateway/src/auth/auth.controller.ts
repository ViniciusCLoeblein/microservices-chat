import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'apps/generics/decorators/public-decorator';

@Controller('auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Api de teste no auth' })
  @Get('teste')
  teste(): Observable<any> {
    return this.authService.teste();
  }

  @ApiOperation({ summary: 'Registra um usuario' })
  @Post('register')
  register(@Body() data: RegisterDto): Observable<any> {
    return this.authService.register(data);
  }

  @ApiOperation({ summary: 'Faz login' })
  @Post('login')
  login(@Body() data: LoginDto): Observable<any> {
    return this.authService.login(data);
  }
}
