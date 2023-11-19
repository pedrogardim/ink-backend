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
import { TattooWork } from "./TattooWork";

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
    name: "first_name",
  })
  firstName: string;

  @Column({
    length: 50,
    name: "last_name",
  })
  lastName: string;

  @Column({
    name: "phone_number",
  })
  phoneNumber: number;

  @Column({ nullable: true, length: 2000, name: "profile_pic_url" })
  profilePicUrl: string;

  @Column({
    type: "enum",
    enum: ["client", "tattooist", "admin", "super_admin"],
    default: "client",
  })
  role: UserRoleType;

  @OneToMany(() => Appointment, (appointment) => appointment.client, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  clientAppointments: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.tattooist, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tattooist_id" })
  tattooistAppointments: Appointment[];

  @OneToMany(() => TattooWork, (tattoo_works) => tattoo_works.tattooist, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tattooist_id" })
  tattooWorks: TattooWork[];

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;
}
