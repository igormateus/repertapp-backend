import { ApiProperty } from '@nestjs/swagger';
import { User as UserPrisma } from '@prisma/client';

export class User implements UserPrisma {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false, nullable: true })
  email: string | null;

  @ApiProperty({ required: false, nullable: true })
  name: string | null;

  @ApiProperty({ required: false, nullable: true })
  bio: string | null;
}

export type UserType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
  email: string | null;
  name: string | null;
  bio: string | null;
};

type UserSelect = {
  id: boolean;
  createdAt: boolean;
  updatedAt: boolean;
  username: boolean;
  password: boolean;
  email: boolean;
  name: boolean;
  bio: boolean;
};

export const userSelect: UserSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  username: true,
  password: true,
  email: true,
  name: true,
  bio: true,
};
