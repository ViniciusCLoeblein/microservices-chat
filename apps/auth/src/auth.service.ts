import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  public async teste(): Promise<any> {
    return this.authRepository.teste();
  }
}