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
import { ChangePasswordDto } from './dto/changePassword.dto';
import { SendEmailDto } from './dto/sendEmail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPasswordDto.dto';

@Injectable()
export class AuthService {
  private client: OAuth2Client;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
  }

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.usersService.findByEmail(signUpDto.email);
    if (existingUser)
      throw new BadRequestException(
        'An account with this email already exists.',
      );
    const hashedPasswd = await bcrypt.hash(signUpDto.password, 10);
    await this.usersService.create({ ...signUpDto, password: hashedPasswd });
    return 'user created successfully';
  }

  async signIn(signInDto: SignInDto) {
    const existingUser = await this.usersService.findByEmail(signInDto.email);
    if (!existingUser) {
      throw new UnauthorizedException('Please enter a valid email address.');
    }

    if (existingUser.authProvider === AuthProvider.GOOGLE) {
      throw new UnauthorizedException('Please sign in with Google');
    }
    const isPasswEqual = await bcrypt.compare(
      signInDto.password,
      existingUser.password,
    );
    if (!isPasswEqual) throw new UnauthorizedException('Invalid credentials');
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

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findOne(userId);

    const isPasswEqual = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!changePasswordDto.oldPassword || !changePasswordDto.newPassword) {
      throw new BadRequestException('Password data missing');
    }

    if (!changePasswordDto.oldPassword || !user?.password) {
      throw new BadRequestException('Invalid password data');
    }

    if (!isPasswEqual) {
      throw new BadRequestException(
        'Old password does not match. Please try again.',
      );
    }

    const hashedPasswd = await bcrypt.hash(changePasswordDto.newPassword, 10);
    const updatedUser = await this.usersService.update(userId, {
      password: hashedPasswd,
      passwordChangedAt: new Date(),
    });

    console.log(updatedUser);

    console.log('Password successfully changed');
  }

  async onGoogleLogin(code: string) {
    console.log('Received code:', code);
    if (!code) throw new BadRequestException('No code received');
    try {
      const { tokens } = await this.client.getToken({
        code,
        redirect_uri: process.env.REDIRECT_URI,
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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = (await this.usersService.findByEmail(
      forgotPasswordDto.email,
    )) as any;

    if (!user) {
      return 'Reset link will be sent';
    }

    const payload = {
      userId: user._id,
    };

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    const resetLink = `${process.env.VITE_FRONTEND_URL}/reset-password?token=${accessToken}`;

    const sendEmailDto: SendEmailDto = {
      from: '"No Reply" <noreply@example.com>',
      to: [forgotPasswordDto.email],
      subject: 'Reset your password',
      name: user.name || user.email,
      link: resetLink,
    };
    console.log('Sending email to:', sendEmailDto.to);

    console.log('accessToken: ', accessToken);
    try {
      await this.sendEmail(sendEmailDto);
      console.log('resetLink: ', resetLink);

      return { message: 'Reset link sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'Failed to send reset link' };
    }
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    console.log('Sending email to:', sendEmailDto.to);
    try {
      const result = await this.mailerService.sendMail({
        from: sendEmailDto.from,
        to: sendEmailDto.to,
        subject: sendEmailDto.subject,
        template: 'reset-password',
        context: {
          name: sendEmailDto.name,
          link: sendEmailDto.link,
        },
      });
      console.log('Mail sent result:', result);
      return result;
    } catch (error) {
      console.error('Mailer error:', error);
      throw error;
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const payload = await this.jwtService.verify(resetPasswordDto.token);
    const userId = payload.userId;
    const hashedPasswd = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    await this.usersService.update(userId, { password: hashedPasswd });
    return 'Password successfully reset';
  }
}
