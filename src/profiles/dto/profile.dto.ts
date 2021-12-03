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

  @ApiProperty()
  imageUrl: string | null;
}

export type ProfileType = {
  id: string;
  name?: string;
  username: string;
  bio?: string;
  imageUrl?: string;
};

type ProfileSelect = {
  id: boolean;
  name: boolean;
  username: boolean;
  bio: boolean;
  imageUrl: boolean;
};
export const profileSelect: ProfileSelect = {
  id: true,
  name: true,
  username: true,
  bio: true,
  imageUrl: true,
};
