import { Injectable } from '@nestjs/common';

@Injectable()
export class GameRepository {
  constructor() {}

  async teste(): Promise<any> {
    return { status: 'ok' };
  }
}
