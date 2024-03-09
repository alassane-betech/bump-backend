import { BaseModel } from "src/base/entities/base.entity";
import { Column, Entity } from "typeorm";
import { UserCategoryEnum } from "../enums/user-category.enum";

@Entity("users", { orderBy: { createdAt: "DESC" } })
export class UserEntity extends BaseModel {
  @Column({ length: 100, nullable: true })
  firstname: string;

  @Column({ length: 100, nullable: true })
  lastname: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 10, nullable: true })
  birthdate: string;

  @Column({
    type: "enum",
    enum: UserCategoryEnum,
    default: UserCategoryEnum.AMATEUR // Default category for new users
  })
  category: UserCategoryEnum;

  @Column({ nullable: true })
  profilPicture: string;

  @Column({ nullable: true })
  password: string;
}
