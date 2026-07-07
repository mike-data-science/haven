import {
  booleanValue,
  createCrudHandlers,
  dateValue,
  numberValue,
  pickDefined,
} from "@/lib/apiCrud";

export const appointmentHandlers = createCrudHandlers({
  modelName: "appointment",
  entityName: "Appointment",
  include: { user: true, property: true },
  buildData: (body) =>
    pickDefined({
      visitDate: dateValue(body.visitDate),
      status: body.status,
      notes: body.notes,
      userId: numberValue(body.userId),
      propertyId: numberValue(body.propertyId),
    }),
});

export const categoryHandlers = createCrudHandlers({
  modelName: "category",
  entityName: "Category",
  buildData: (body) =>
    pickDefined({
      name: body.name,
      slug: body.slug,
    }),
});

export const conversationHandlers = createCrudHandlers({
  modelName: "conversation",
  entityName: "Conversation",
  include: { user: true, property: true },
  buildData: (body) =>
    pickDefined({
      userId: numberValue(body.userId),
      propertyId: numberValue(body.propertyId) ?? null,
    }),
});

export const favoriteHandlers = createCrudHandlers({
  modelName: "favorite",
  entityName: "Favorite",
  include: { user: true, property: true },
  buildData: (body) =>
    pickDefined({
      userId: numberValue(body.userId),
      propertyId: numberValue(body.propertyId),
    }),
});

export const imageHandlers = createCrudHandlers({
  modelName: "image",
  entityName: "Image",
  include: { property: true },
  buildData: (body) =>
    pickDefined({
      url: body.url,
      alt: body.alt,
      order: numberValue(body.order),
      propertyId: numberValue(body.propertyId),
    }),
});

export const inquiryHandlers = createCrudHandlers({
  modelName: "inquiry",
  entityName: "Inquiry",
  include: { user: true, property: true },
  buildData: (body) =>
    pickDefined({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      userId: numberValue(body.userId) ?? null,
      propertyId: numberValue(body.propertyId),
    }),
});

export const messageHandlers = createCrudHandlers({
  modelName: "message",
  entityName: "Message",
  include: { conversation: true, sender: true },
  buildData: (body) =>
    pickDefined({
      content: body.content,
      conversationId: numberValue(body.conversationId),
      senderId: numberValue(body.senderId),
    }),
});

export const propertyHandlers = createCrudHandlers({
  modelName: "property",
  entityName: "Property",
  include: { user: true, category: true, images: true },
  allowedRoles: ['ADMIN', 'AGENT', 'USER'],
  ownershipField: 'userId',
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
      categoryId: numberValue(body.categoryId) ?? null,
      latitude: numberValue(body.latitude),
      longitude: numberValue(body.longitude),
      pinTop: body.pinTop,
      pinLeft: body.pinLeft,
    }),
});

export const reviewHandlers = createCrudHandlers({
  modelName: "review",
  entityName: "Review",
  include: { user: true, property: true },
  buildData: (body) =>
    pickDefined({
      rating: numberValue(body.rating),
      comment: body.comment,
      userId: numberValue(body.userId),
      propertyId: numberValue(body.propertyId),
    }),
});

export const userHandlers = createCrudHandlers({
  modelName: "user",
  entityName: "User",
  buildData: (body) =>
    pickDefined({
      name: body.name,
      email: body.email,
      clerkId: body.clerkId,
      avatarUrl: body.avatarUrl,
      phone: body.phone,
      title: body.title,
      role: body.role, // Prisma enum matches strings nicely if valid
    }),
});
