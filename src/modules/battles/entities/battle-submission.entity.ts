import { BaseModel } from "src/base/entities/base.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BattleEntity } from "./battle.entity";

@Entity("battle-submissions", { orderBy: { createdAt: "DESC" } })
export class BattleSubmissionEntity extends BaseModel {
  @ManyToOne(() => BattleEntity)
  @JoinColumn({ name: "battleId" })
  battle: BattleEntity;

  @Column("uuid")
  battleId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column("uuid")
  userId: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 1000 })
  description: string;

  @Column()
  media: string;
}
