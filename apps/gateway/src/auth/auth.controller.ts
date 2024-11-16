import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Api de teste no auth' })
  @Get('teste')
  teste(): Observable<any> {
    return this.authService.teste();
  }
}