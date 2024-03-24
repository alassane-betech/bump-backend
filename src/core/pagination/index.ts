import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDto } from "./dto/page-meta.dto";

export interface IPage<T> {
  data: T[];
  meta: PageMetaDto;
}

export abstract class PaginatedType<T> implements IPage<T> {
  @ApiProperty({ isArray: true, type: [Object] })
  data: T[];

  @ApiProperty({ type: PageMetaDto })
  meta: PageMetaDto;
}

export * from "./paginate";
