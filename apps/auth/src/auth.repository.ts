import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "apps/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async teste(): Promise<any> {
    return { status: 'okaa' };
  }

  async createUser(email: string, password: string) {
    return await this.userRepo.save({ email, password });
  }

  async findUser(email: string) {
    return await this.userRepo.findOneBy({ email });
  }
}
