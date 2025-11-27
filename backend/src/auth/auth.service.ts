import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private userService: UserService,
    @Inject()
    private jwtService: JwtService,
  ) {}
  async logIn(authDto: AuthDto): Promise<{ access_token: string }> {
    try {
      const { email, password } = authDto;
      const user = await this.userService.findOneByEmail(email);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user._id, username: user.name };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        access_token,
      };
    } catch {
      throw new UnauthorizedException({
        message: 'Email and Password doesnt match',
      });
    }
  }
}
