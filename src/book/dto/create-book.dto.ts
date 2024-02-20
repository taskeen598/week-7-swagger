import { ApiProperty } from '@nestjs/swagger';
import {Category} from '../schemas/book.schema';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
// import { User } from 'src/auth/schema/auth.schema';
import {User} from '../../auth/schema/auth.schema'

export class CreateBookDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Category, {message: "Please enter correct category."})
    readonly category: Category;

    user:User
}