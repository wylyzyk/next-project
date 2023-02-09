import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Column()
  public nickname!: string;

  @Column()
  public avatar!: string;

  @Column()
  public job!: string;

  @Column()
  public introduce!: string;
}
