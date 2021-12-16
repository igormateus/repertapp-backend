import { Music } from './music.entity';
import { Link as LinkPrisma } from '@prisma/client';

export class Link implements LinkPrisma {
  id: string;
  url: string;
  description: string;
  musicId: string;
  music: Music;
}
