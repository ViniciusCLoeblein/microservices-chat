import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE_RMQ')
    private readonly clientRMQ: ClientRMQ,
  ) {}

  teste(): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Auth.Teste' }, {});
  }

  register(data: RegisterDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Auth.Register' }, data);
  }

  login(data: LoginDto): Observable<any> {
    return this.clientRMQ.send({ cmd: 'Auth.Login' }, data);
  }
}
