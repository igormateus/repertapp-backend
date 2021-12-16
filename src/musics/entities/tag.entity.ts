import { Music } from './music.entity';
import { Tag as TagPrisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Tag implements TagPrisma {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [Music] })
  musics: Music[];
}
