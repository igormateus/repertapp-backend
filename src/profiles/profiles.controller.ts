import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ApiPageResponse } from './../page/api-page-response.decorator';
import { ConnectionArgs } from './../page/connection-args.dto';
import { Page } from './../page/page.dto';
import { Profile } from './dto/profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
@ApiTags('profiles')
@ApiExtraModels(Page)
@ApiBearerAuth()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @ApiPageResponse(Profile)
  findAll(@Query() connectionArgs: ConnectionArgs) {
    return this.profilesService.findAll(connectionArgs);
  }

  @Get(':id')
  @ApiOkResponse({ type: Profile })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }
}
