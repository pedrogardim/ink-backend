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

  @Column({ name: "image_url", nullable: true, length: 2000 })
  imageUrl: string;

  @Column({ name: "tattooist_id" })
  tattooistId: number;

  @ManyToOne(() => User, (user) => user.tattooWorks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tattooist_id" })
  tattooist: User;

  @Column({
    type: "enum",
    enum: ["tattoo", "piercing"],
    default: "tattoo",
  })
  type: TattooWorkType;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
