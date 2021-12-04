import { profileSelect, Profile } from './../../profiles/dto/profile.dto';
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

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty({ type: [Profile] })
  members: Profile[];
}

export type BandType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  members: Profile[];
};

type BandSelect = {
  id: boolean;
  createdAt: boolean;
  updatedAt: boolean;
  name: boolean;
  description: boolean;
  members: { select: typeof profileSelect };
};
export const bandSelect: BandSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  description: true,
  members: { select: profileSelect },
};

export type BandSummaryType = {
  id: string;
  name: string;
  description: string;
};

type BandSummarySelect = {
  id: boolean;
  name: boolean;
  description: boolean;
};
export const bandSummarySelect: BandSummarySelect = {
  id: true,
  name: true,
  description: true,
};
