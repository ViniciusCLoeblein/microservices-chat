import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from 'apps/gateway/src/auth/dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'apps/gateway/src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async teste(): Promise<any> {
    return this.authRepository.teste();
  }

  async register(data: RegisterDto): Promise<any> {
    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await this.authRepository.createUser({
      ...data,
      password: hashPassword,
    });

    return { id: user.id };
  }

  async login(data: LoginDto): Promise<any> {
    const user = await this.authRepository.findUser(data.email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const verifyPswd = await bcrypt.compare(data.password, user.password);

    if (!verifyPswd) {
      throw new UnauthorizedException('Senha inválida');
    }

    const token = await this.createToken(user.id);

    return { id: user.id, email: user.email, name: user.name, ...token };
  }

  async createToken(userId: string) {
    const timeToken = process.env.JWT_EXPIRES_IN;
    const accessToken = this.jwtService.sign({
      sub: userId,
    });

    return {
      accessToken,
      accessTokenExpiresAt: moment()
        .add(timeToken[0], timeToken[1] as 'd' | 'h')
        .format(),
    };
  }
}
