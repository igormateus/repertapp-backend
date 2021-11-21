import { PageInfo } from './page-info.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Edge } from './edge.dto';

export class Page<Record> {
  edges: Edge<Record>[];

  @ApiProperty()
  pageInfo: PageInfo;

  @ApiProperty()
  totalCount: number;
}