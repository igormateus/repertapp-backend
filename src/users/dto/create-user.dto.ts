import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  username: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'password must have at least a letter, a number and 6 digts lenght',
  })
  password: string;

  @IsOptional()
  @MinLength(5)
  @ApiProperty({ required: false })
  name?: string | null;

  @IsOptional()
  @MinLength(5)
  @ApiProperty({ required: false })
  bio?: string | null;
}
