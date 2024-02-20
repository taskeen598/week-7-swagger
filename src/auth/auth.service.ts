import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schema/auth.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: any; message: string }> {
    try {
      const { email, password } = loginDto;

      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const token = this.jwtService.sign({ id: user._id });
      return { token, user, message: 'User logged in successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error during login process');
    }
  }

  async signUp(
    signUpAuthDto: SignUpAuthDto,
  ): Promise<{ token: string; user: any; message: string }> {
    try {
      const { name, email, password } = signUpAuthDto;

      const emailExist = await this.userModel.find({ email });

      if (emailExist.length > 0) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = this.jwtService.sign({ id: user._id });

      return { token, user, message: 'User created successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error during signup process');
    }
  }

  async getAllUsers(): Promise<{ users: any[]; message: string }> {
    try {
      const users = await this.userModel.find();
      return { users, message: 'Users retrieved successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error while retrieving users');
    }
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    try {
      const user = await this.userModel.findByIdAndDelete(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error while deleting user');
    }
  }
}
