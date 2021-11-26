import { ApiProperty } from '@nestjs/swagger';
import { Band as BandPrisma } from '@prisma/client';

export class Band implements BandPrisma {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description: string;
}
