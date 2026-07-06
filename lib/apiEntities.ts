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
import {
  booleanValue,
  createCrudHandlers,
  dateValue,
  nullableRelation,
  numberValue,
  pickDefined,
  relation,
} from "@/lib/apiCrud";

export const appointmentHandlers = createCrudHandlers({
  entity: Appointment,
  entityName: "Appointment",
  relations: ["user", "property"],
  buildData: (body) =>
    pickDefined({
      visitDate: dateValue(body.visitDate),
      status: body.status,
      notes: body.notes,
      user: relation(body.userId),
      property: relation(body.propertyId),
    }),
});

export const categoryHandlers = createCrudHandlers({
  entity: Category,
  entityName: "Category",
  buildData: (body) =>
    pickDefined({
      name: body.name,
      slug: body.slug,
    }),
});

export const conversationHandlers = createCrudHandlers({
  entity: Conversation,
  entityName: "Conversation",
  relations: ["user", "property"],
  buildData: (body) =>
    pickDefined({
      user: relation(body.userId),
      property: nullableRelation(body.propertyId),
    }),
});

export const favoriteHandlers = createCrudHandlers({
  entity: Favorite,
  entityName: "Favorite",
  relations: ["user", "property"],
  buildData: (body) =>
    pickDefined({
      user: relation(body.userId),
      property: relation(body.propertyId),
    }),
});

export const imageHandlers = createCrudHandlers({
  entity: Image,
  entityName: "Image",
  relations: ["property"],
  buildData: (body) =>
    pickDefined({
      url: body.url,
      alt: body.alt,
      order: numberValue(body.order),
      property: relation(body.propertyId),
    }),
});

export const inquiryHandlers = createCrudHandlers({
  entity: Inquiry,
  entityName: "Inquiry",
  relations: ["user", "property"],
  buildData: (body) =>
    pickDefined({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      user: nullableRelation(body.userId),
      property: relation(body.propertyId),
    }),
});


export const messageHandlers = createCrudHandlers({
  entity: Message,
  entityName: "Message",
  relations: ["conversation", "sender"],
  buildData: (body) =>
    pickDefined({
      content: body.content,
      conversation: relation(body.conversationId),
      sender: relation(body.senderId),
    }),
});

export const propertyHandlers = createCrudHandlers({
  entity: Property,
  entityName: "Property",
  relations: ["user", "category"],
  buildData: (body) =>
    pickDefined({
      title: body.title,
      description: body.description,
      price: numberValue(body.price),
      city: body.city,
      address: body.address,
      rooms: numberValue(body.rooms),
      bathrooms: numberValue(body.bathrooms),
      area: numberValue(body.area),
      floor: numberValue(body.floor),
      yearBuilt: numberValue(body.yearBuilt),
      isPublished: booleanValue(body.isPublished),
      user: relation(body.userId),
      category: nullableRelation(body.categoryId),
      latitude: numberValue(body.latitude),
      longitude: numberValue(body.longitude),
    }),
});

export const reviewHandlers = createCrudHandlers({
  entity: Review,
  entityName: "Review",
  relations: ["user", "property"],
  buildData: (body) =>
    pickDefined({
      rating: numberValue(body.rating),
      comment: body.comment,
      user: relation(body.userId),
      property: relation(body.propertyId),
    }),
});

export const roleHandlers = createCrudHandlers({
  entity: Role,
  entityName: "Role",
  buildData: (body) =>
    pickDefined({
      name: body.name,
    }),
});

export const userHandlers = createCrudHandlers({
  entity: User,
  entityName: "User",
  relations: ["userRole"],
  buildData: (body) =>
    pickDefined({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
      userRole: nullableRelation(body.userRoleId ?? body.roleId),
    }),
});
