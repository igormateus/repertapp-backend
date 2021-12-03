import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false, nullable: true })
  email: string | null;

  @IsOptional()
  @MinLength(3)
  @ApiProperty({ required: false, nullable: true })
  name: string | null;

  @IsOptional()
  @MaxLength(250)
  @ApiProperty({ required: false, nullable: true })
  bio: string | null;
}
