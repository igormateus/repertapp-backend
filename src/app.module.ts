import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';
import { BandsModule } from './bands/bands.module';

@Module({
  imports: [PrismaModule, UsersModule, ProfilesModule, AuthModule, BandsModule],
})
export class AppModule {}
