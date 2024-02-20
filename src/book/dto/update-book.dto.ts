import { ApiProperty } from '@nestjs/swagger';
import {Category} from '../schemas/book.schema';
import { IsString, IsOptional, IsEnum, IsNumber  } from 'class-validator';
import { User } from 'src/auth/schema/auth.schema';

export class UpdateBookDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly author: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    readonly price: number;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Category, {message: "Please enter correct category."})
    readonly category: Category;

    user:User
}