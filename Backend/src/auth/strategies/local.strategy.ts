import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
// import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({ usernameField: 'email' });
  }

  validate(username: string, password: string) {
    const user = this.usersService.validateUser(username, password);

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
