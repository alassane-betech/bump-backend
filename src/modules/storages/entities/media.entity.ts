import { BaseModel } from "src/base/entities/base.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { MediaTypeEnum } from "../enums/media-type.enum";

@Entity("medias", { orderBy: { createdAt: "DESC" } })
export class MediaEntity extends BaseModel {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column("uuid")
  userId: string;

  @Column({
    type: "enum",
    enum: MediaTypeEnum,
    default: MediaTypeEnum.IMAGE
  })
  type: MediaTypeEnum;

  @Column()
  format: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  externalId: string;

  @Column()
  url: string;

  @Column()
  secureUrl: string;

  @Column()
  reference: string;
}
