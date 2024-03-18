import { BaseModel } from "src/base/entities/base.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BattleStatusEnum } from "../enums/battle-status.enum";

@Entity("battles", { orderBy: { createdAt: "DESC" } })
export class BattleEntity extends BaseModel {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userAId" })
  userA: UserEntity;

  @Column("uuid")
  userAId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userBId" })
  userB: UserEntity;

  @Column("uuid")
  userBId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "winnerId" })
  winner: UserEntity;

  @Column("uuid")
  winnerId: string;

  @Column("uuid")
  topicId: string;

  @Column({
    type: "enum",
    enum: BattleStatusEnum
  })
  status: BattleStatusEnum;
}
