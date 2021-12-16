import { Link } from './link.entity';
import { Tag } from './tag.entity';
import { Band, BandSummaryType } from './../../bands/entities/band.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Music as MusicPrisma } from '@prisma/client';

export class Music implements MusicPrisma {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  artist: string;

  @ApiProperty()
  tone: string;

  @ApiProperty({ default: false })
  isPlayed: boolean;

  @ApiProperty({ default: 1000 })
  score: number;

  @ApiProperty({ default: 0 })
  counterPlays: number;

  @ApiProperty()
  bandId: string;

  @ApiProperty()
  band: Band;

  @ApiProperty({ type: [Tag] })
  tags: Tag[];

  @ApiProperty({ type: [Link] })
  links: Link[];
}
