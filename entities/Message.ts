import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Conversation } from "./Conversation";
import { User } from "./User";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content!: string;

  @ManyToOne(() => Conversation, { nullable: false })
  conversation!: Conversation;

  @ManyToOne(() => User, { nullable: false })
  sender!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
