import { BaseModel } from "src/base/entities/base.entity";
import { BattleSubmissionEntity } from "src/modules/battles/entities/battle-submission.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("votes", { orderBy: { createdAt: "DESC" } })
export class VoteEntity extends BaseModel {
  @ManyToOne(() => BattleSubmissionEntity)
  @JoinColumn({ name: "battleSubmissionId" })
  battleSubmission: BattleSubmissionEntity;

  @Column("uuid")
  battleSubmissionId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column("uuid")
  userId: string;
}
