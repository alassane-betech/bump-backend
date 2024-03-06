import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, BaseEntity } from "typeorm";

export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column({ name: "activated", type: "boolean", default: true })
  activated: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
