import { LoginDto } from './dto/login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOkResponse({ type: Auth })
  login(@Body() { username, password }: LoginDto) {
    return this.authService.login(username, password);
  }
}
