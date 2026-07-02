import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Property } from "./Property";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @ManyToOne(() => Property, { nullable: true })
  property?: Property;

  @CreateDateColumn()
  createdAt!: Date;
}
