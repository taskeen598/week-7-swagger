import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class SignUpAuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter a correct email'})
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: 'Password must be atleast 8 characters long'})
    readonly password: string;
}