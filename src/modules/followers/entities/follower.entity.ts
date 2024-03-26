import { BaseModel } from "src/base/entities/base.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

@Entity("followers", { orderBy: { createdAt: "DESC" } })
export class FollowerEntity extends BaseModel {
  @ManyToOne(() => UserEntity, (user) => user.followers)
  @JoinColumn({ name: "followerId" })
  follower: UserEntity;

  @Index()
  @Column("uuid")
  followerId: string;

  @ManyToOne(() => UserEntity, (user) => user.followings)
  @JoinColumn({ name: "followingId" })
  following: UserEntity;

  @Index()
  @Column("uuid")
  followingId: string;
}
