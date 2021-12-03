import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsOptional, MaxLength } from 'class-validator';

export class CreateBandDto {
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  name: string;

  @IsOptional()
  @MaxLength(250)
  @ApiProperty({ required: false, nullable: true })
  description: string;
}
