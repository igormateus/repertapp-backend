import { AuthDto } from './../auth/dto/auth.dto';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UserAuth } from './../auth/user-auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users') // group all endpoints together
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  async findOne(@UserAuth() userAuth: AuthDto) {
    console.log(userAuth);
    return await this.usersService.loadUser(userAuth.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  update(@UserAuth() userAuth: AuthDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userAuth.id, updateUserDto);
  }
}
