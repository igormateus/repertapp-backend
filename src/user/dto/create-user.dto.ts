import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsOptional()
  @MinLength(5)
  @ApiProperty({ required: false })
  name?: string | null;

  @IsOptional()
  @MinLength(5)
  @ApiProperty({ required: false })
  bio?: string | null;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ required: false })
  imageUrl?: string | null;
}
