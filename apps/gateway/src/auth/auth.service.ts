import { Inject, Injectable } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE_RMQ')
    private readonly publicoServiceRMQ: ClientRMQ,
  ) {}

  teste(): Observable<any> {
    return this.publicoServiceRMQ.send({ cmd: 'Auth.Teste' }, {});
  }
}