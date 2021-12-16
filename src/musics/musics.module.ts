import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';

@Module({
  controllers: [MusicsController],
  providers: [MusicsService]
})
export class MusicsModule {}
