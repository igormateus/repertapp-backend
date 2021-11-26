import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConnectionArgs } from './../page/connection-args.dto';
import { Page } from './../page/page.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ApiPageResponse } from './../page/api-page-response.decorator';
import { Profile } from './entities/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profiles')
@ApiTags('profiles')
@ApiExtraModels(Page)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Profile })
  async findOne(@Param('id') id: string) {
    return await this.profileService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiPageResponse(Profile)
  async findAll(@Query() connectionArgs: ConnectionArgs) {
    return await this.profileService.findAll(connectionArgs);
  }
}
