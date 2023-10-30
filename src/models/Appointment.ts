import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./User";

export type AppointmentType = "tattoo" | "piercing";

@Entity("appointments")
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    length: 256,
  })
  description: string;

  @Column({ name: "start_time" })
  startTime: Date;

  @Column({ name: "end_time" })
  endTime: Date;

  @Column({
    type: "enum",
    enum: ["tattoo", "piercing"],
    default: "tattoo",
  })
  type: AppointmentType;

  @ManyToOne(() => User, (user) => user.clientAppointments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  client: User;

  @ManyToOne(() => User, (user) => user.tattooistAppointments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tattooist_id" })
  tattooist: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
