import { User as UserPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User implements UserPrisma {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  bio: string;

  @ApiProperty({ required: false })
  imageUrl: string;
}
