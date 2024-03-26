import { ApiProperty } from "@nestjs/swagger";
import { PageOptionsDto } from "./page-options.dto";

export class PageMetaDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentItems: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPreviousPage: boolean;

  constructor(pageOptions: PageOptionsDto, total: number, currents: number) {
    this.totalItems = total;
    this.itemsPerPage = pageOptions.take;
    this.totalPages = Math.ceil(this.totalItems / pageOptions.take);
    this.currentItems = currents;
    this.currentPage = pageOptions.page;
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.currentPage < this.totalPages;
  }
}
