import { AuthDto } from './dto/auth.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
