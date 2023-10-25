export type UserRoleType = "client" | "tattooist" | "admin" | "super_admin";

import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { Appointment } from "./Appointment";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 254,
  })
  email: string;

  @Column({
    length: 60,
  })
  password: string;

  @Column({
    length: 50,
  })
  first_name: string;

  @Column({
    length: 50,
  })
  last_name: string;

  @Column()
  phone_number: number;

  @Column({ nullable: true, length: 2000 })
  profile_pic_url: string;

  @Column({
    type: "enum",
    enum: ["client", "tattooist", "admin", "super_admin"],
    default: "client",
  })
  role: UserRoleType;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  @JoinColumn({ name: "client_id" })
  clientAppointments: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.tattooist)
  @JoinColumn({ name: "tattooist_id" })
  tattooistAppointments: Appointment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
