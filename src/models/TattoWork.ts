export type TattooWorkType = "tattoo" | "piercing";

import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./User";

@Entity("tattoo_works")
export class TattooWork extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 256,
  })
  description: string;

  @Column({ nullable: true, length: 2000 })
  image_url: string;

  @ManyToOne(() => User, (user) => user.works, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tattooist_id" })
  tattooist: User;

  @Column({
    type: "enum",
    enum: ["tattoo", "piercing"],
    default: "tattoo",
  })
  type: TattooWorkType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
