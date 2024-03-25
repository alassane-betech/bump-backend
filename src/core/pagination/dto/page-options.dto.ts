import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, Min } from "class-validator";

const DEFAULT_LIMIT = 10;

export enum Order {
  ASC = "ASC",
  DESC = "DESC"
}

export class PageOptionsDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1
  })
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    default: DEFAULT_LIMIT
  })
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  take: number = DEFAULT_LIMIT;

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  order: Order = Order.DESC;

  @ApiPropertyOptional()
  @IsOptional()
  orderBy: string;

  get skip() {
    return (this.page - 1) * this.take;
  }

  get orderQuery() {
    const order: any = { createdAt: this.order };

    if (this.orderBy) {
      order[this.orderBy] = this.order;
    }

    return order;
  }
}
