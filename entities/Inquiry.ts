
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Property } from "./Property";

@Entity()
export class Inquiry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column("text")
  message!: string;

  @ManyToOne(() => User, { nullable: true })
  user?: User;

  @ManyToOne(() => Property, { nullable: false })
  property!: Property;

  @CreateDateColumn()
  createdAt!: Date;
}
