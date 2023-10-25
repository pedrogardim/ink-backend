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

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column({
    type: "enum",
    enum: ["tattoo", "piercing"],
    default: "client",
  })
  role: AppointmentType;

  @ManyToOne(() => User, (user) => user.clientAppointments)
  @JoinColumn({ name: "client_id" })
  client: User;

  @ManyToOne(() => User, (user) => user.tattooistAppointments)
  @JoinColumn({ name: "tattooist_id" })
  tattooist: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
