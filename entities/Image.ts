import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import type { Property } from "./Property";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @Column({
    nullable: true,
  })
  alt!: string;

  @Column({
    default: 0,
  })
  order!: number;

  @ManyToOne("Property", { nullable: false })
  property!: Property;
}
