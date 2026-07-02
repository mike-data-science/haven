import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";
import { Category } from "./Category";
import type { Image } from "./Image";


@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column("numeric")
  price!: number;

  @Column()
  city!: string;

  @Column()
  address!: string;

  @Column()
  rooms!: number;

  @Column()
  bathrooms!: number;

  @Column()
  area!: number;

  @Column()
  floor!: number;

  @Column()
  yearBuilt!: number;

  @Column({
    default: true,
  })
  isPublished!: boolean;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @ManyToOne(() => Category, { nullable: true })
  category?: Category;

  @Column("numeric", { nullable: true })
  latitude?: number;

  @Column("numeric", { nullable: true })
  longitude?: number;
  
  @Column({ nullable: true })
  pinTop?: string;

  @Column({ nullable: true })
  pinLeft?: string;

  @OneToMany("Image", (image: any) => image.property)
  images!: Image[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
