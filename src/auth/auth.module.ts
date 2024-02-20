import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/auth.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRE'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{name: 'User', schema:UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [JWTStrategy, PassportModule],
})
export class AuthModule {}
