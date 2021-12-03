import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  username: string;

  @ApiProperty()
  bio: string | null;
}

export type ProfileType = {
  id: string;
  name?: string;
  username: string;
  bio?: string;
};

type ProfileSelect = {
  id: boolean;
  name: boolean;
  username: boolean;
  bio: boolean;
};
export const profileSelect: ProfileSelect = {
  id: true,
  name: true,
  username: true,
  bio: true,
};
