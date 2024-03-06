import { BaseModel } from "src/base/entities/base.entity";
import { Column, Entity } from "typeorm";
import { CategoryEnum } from "./category.enum";

@Entity("users", { orderBy: { createdAt: "DESC" } })
export class UserEntity extends BaseModel {
  @Column({ length: 100, nullable: true })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ length: 100, nullable: true })
  username: string;

  @Column({ length: 100, unique: true, nullable: true })
  email: string;

  @Column({ length: 10, nullable: true })
  birthDate: string;

  @Column({
    type: "enum",
    enum: CategoryEnum,
    default: CategoryEnum.AMATEUR // Default category for new users
  })
  category: CategoryEnum;

  @Column({ nullable: true })
  profilPicture: string;

  @Column({ nullable: true })
  password: string;
}
