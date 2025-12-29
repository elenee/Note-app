import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { AuthProvider } from 'src/enums/authProvider.enum';

@Injectable()
export class AuthService {
  private client: OAuth2Client;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
  }

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.usersService.findByEmail(signUpDto.email);
    if (existingUser) throw new BadRequestException('user already exists');
    const hashedPasswd = await bcrypt.hash(signUpDto.password, 10);
    console.log(hashedPasswd);
    await this.usersService.create({ ...signUpDto, password: hashedPasswd });
    return 'user created successfully';
  }

  async signIn(signInDto: SignInDto) {
    const existingUser = await this.usersService.findByEmail(signInDto.email);
    if (!existingUser) throw new UnauthorizedException('invalid credentials');
    if (existingUser.authProvider === AuthProvider.GOOGLE) {
      throw new UnauthorizedException('Please sign in with Google');
    }
    const isPasswEqual = await bcrypt.compare(
      signInDto.password,
      existingUser.password,
    );
    if (!isPasswEqual) throw new UnauthorizedException('invalid credentials');
    const payload = {
      userId: existingUser._id,
    };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    return { accessToken };
  }

  async currentUser(userId: string) {
    const user = await this.usersService.findOne(userId);
    return user;
  }

  async onGoogleLogin(code: string) {
    console.log('Received code:', code);
    if (!code) throw new BadRequestException('No code received');
    try {
      const { tokens } = await this.client.getToken({
        code,
        redirect_uri: 'http://localhost:5173',
      });
      console.log('Tokens from Google:', tokens);
      const idToken = tokens.id_token;
      if (!idToken) throw new BadRequestException('No ID token returned');

      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload?.email) throw new BadRequestException('No email in token');

      let user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        user = await this.usersService.create({
          email: payload.email,
          authProvider: AuthProvider.GOOGLE,
        });
      }

      const accessToken = this.jwtService.sign(
        { userId: user._id },
        { expiresIn: '1h' },
      );
      return { accessToken, user: { email: user.email } };
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Google login failed');
    }
  }
}
