import { BaseModel } from "src/base/entities/base.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

@Entity("followers", { orderBy: { createdAt: "DESC" } })
export class FollowerEntity extends BaseModel {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "followerId" })
  follower: UserEntity;

  @Index()
  @Column("uuid")
  followerId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "followingId" })
  following: UserEntity;

  @Index()
  @Column("uuid")
  followingId: string;
}
