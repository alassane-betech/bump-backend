import { BaseEntity, FindOptionsWhere, Repository } from "typeorm";
import { IPage } from ".";
import { PageMetaDto } from "./dto/page-meta.dto";
import { PageOptionsDto } from "./dto/page-options.dto";

export async function paginate<T extends BaseEntity>(
  repo: Repository<T>,
  pageOptions: PageOptionsDto,
  where: FindOptionsWhere<T>
): Promise<IPage<T>> {
  const [result, count] = await repo.findAndCount({
    where: {
      ...where
    },
    take: pageOptions.take,
    skip: pageOptions.skip,
    order: pageOptions.orderQuery
  });

  const meta = new PageMetaDto(pageOptions, count, result.length);

  return { data: result, meta };
}
