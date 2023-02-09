import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity({ name: "user_auths" })
export class UserAuth extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Column()
  public identity_type!: string;

  @Column()
  public identifier!: string;

  @Column()
  public credential!: string;

  @ManyToOne((type) => User, { cascade: true })
  @JoinColumn({ name: "user_id" })
  public user!: User;
}
