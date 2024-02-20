import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/sign-up')
  signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpAuthDto);
  }

  @Get('/all-users')
  getAllUsers(): Promise<{ users: any[]; message: string }> {
    return this.authService.getAllUsers();
  }

  @Delete('/:id')
  deleteUser(@Param('id') userId: string): Promise<{ message: string }> {
    return this.authService.deleteUser(userId);
  }
}
