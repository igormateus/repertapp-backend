import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBandDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsOptional()
  @MinLength(5)
  @ApiProperty({ required: false })
  description?: string | null;
}
