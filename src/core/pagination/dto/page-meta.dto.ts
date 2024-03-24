import { ApiProperty } from "@nestjs/swagger";
import { PageOptionsDto } from "./page-options.dto";

export class PageMetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  countPage: number;

  @ApiProperty()
  countTotal: number;

  @ApiProperty()
  countCurrent: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPreviousPage: boolean;

  constructor(pageOptions: PageOptionsDto, countTotal: number, countCurrent: number) {
    this.page = pageOptions.page;
    this.take = pageOptions.take;
    this.countTotal = countTotal;
    this.countCurrent = countCurrent;
    this.countPage = Math.ceil(this.countTotal / this.take);

    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.countPage;
  }
}
