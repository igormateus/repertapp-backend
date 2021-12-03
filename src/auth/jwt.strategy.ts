import config from './../config/configuration';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config().jwt.secret,
    });
  }

  async validate(payload: { userId: string }) {
    const user = await this.authService.validateUserById(payload.userId);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
