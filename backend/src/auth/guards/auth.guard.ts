import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request.headers);
    if (!token) throw new BadRequestException('No token provided');

    let payload: any;
    try {
      payload = this.jwtService.verify(token);
      request.userId = payload.userId;
      console.log(request.userId);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const user = await this.usersService.findOne(payload.userId);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    if (
      user.passwordChangedAt &&
      payload.iat * 1000 < user.passwordChangedAt.getTime()
    ) {
      throw new UnauthorizedException('password has changed');
    }

    return true;
  }

  getToken(headers) {
    if (!headers['authorization']) return null;
    const [type, token] = headers['authorization'].split(' ');
    return type === 'Bearer' ? token : null;
  }
}
