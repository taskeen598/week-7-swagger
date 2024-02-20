import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: string }) {
    const { id } = payload;
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
