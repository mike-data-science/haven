import "reflect-metadata";
import { DataSource } from "typeorm";
import { Appointment } from "@/entities/Appointment";
import { Category } from "@/entities/Category";
import { Conversation } from "@/entities/Conversation";
import { Favorite } from "@/entities/Favorite";
import { Image } from "@/entities/Image";
import { Inquiry } from "@/entities/Inquiry";

import { Message } from "@/entities/Message";
import { Property } from "@/entities/Property";
import { Review } from "@/entities/Rewiew";
import { Role } from "@/entities/Role";
import { User } from "@/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 6000,
  username: "postgres",
  password: "15432",
  database: "real_estate",

  synchronize: true,

  entities: [
    Appointment,
    Category,
    Conversation,
    Favorite,
    Image,
    Inquiry,

    Message,
    Property,
    Review,
    Role,
    User,
  ],
  migrations: [],
});
