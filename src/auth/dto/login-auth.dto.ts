import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, IsEmail } from "class-validator";

export class LoginDto {
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