import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  bio: string | null;

  @ApiProperty({ required: false })
  imageUrl: string | null;
}
