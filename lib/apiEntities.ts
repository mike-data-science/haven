import {
  booleanValue,
  createCrudHandlers,
  dateValue,
  numberValue,
  pickDefined,
} from "@/lib/apiCrud";
import prisma from "@/lib/db";

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
  beforeDelete: async (id: number) => {
    await prisma.property.updateMany({ where: { categoryId: id }, data: { categoryId: null } });
  },
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
  beforeDelete: async (id: number) => {
    await prisma.message.deleteMany({ where: { conversationId: id } });
  },
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
  buildData: (body, user, existing) => {
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'MODERATOR';
    const isNew = !existing;
    
    let status = body.status;
    let approvedAt = existing?.approvedAt;
    let publishedAt = existing?.publishedAt;
    let approvedById = existing?.approvedById;

    if (isNew) {
      if (isAdmin) {
        status = body.status || 'APPROVED';
        approvedAt = new Date();
        publishedAt = new Date();
        approvedById = user?.id;
      } else {
        status = 'PENDING';
      }
    } else {
      if (isAdmin) {
        status = body.status || existing?.status || 'APPROVED';
        if (status === 'APPROVED' && existing?.status !== 'APPROVED') {
          approvedAt = new Date();
          publishedAt = new Date();
          approvedById = user?.id;
        }
      } else {
        status = existing?.status || 'PENDING';
      }
    }

    return pickDefined({
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
      status,
      approvedAt,
      publishedAt,
      approvedById,
      categoryId: numberValue(body.categoryId) ?? null,
      latitude: numberValue(body.latitude),
      longitude: numberValue(body.longitude),
      pinTop: body.pinTop,
      pinLeft: body.pinLeft,
    });
  },
  beforeDelete: async (id: number) => {
    await prisma.image.deleteMany({ where: { propertyId: id } });
    await prisma.appointment.deleteMany({ where: { propertyId: id } });
    await prisma.favorite.deleteMany({ where: { propertyId: id } });
    await prisma.inquiry.deleteMany({ where: { propertyId: id } });
    await prisma.review.deleteMany({ where: { propertyId: id } });
    await prisma.propertyModerationHistory.deleteMany({ where: { propertyId: id } });
    await prisma.conversation.updateMany({ where: { propertyId: id }, data: { propertyId: null } });
  },
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
  beforeDelete: async (id: number) => {
    const properties = await prisma.property.findMany({ where: { userId: id }, select: { id: true } });
    for (const prop of properties) {
      await prisma.image.deleteMany({ where: { propertyId: prop.id } });
      await prisma.appointment.deleteMany({ where: { propertyId: prop.id } });
      await prisma.favorite.deleteMany({ where: { propertyId: prop.id } });
      await prisma.inquiry.deleteMany({ where: { propertyId: prop.id } });
      await prisma.review.deleteMany({ where: { propertyId: prop.id } });
      await prisma.propertyModerationHistory.deleteMany({ where: { propertyId: prop.id } });
      await prisma.conversation.updateMany({ where: { propertyId: prop.id }, data: { propertyId: null } });
      await prisma.property.delete({ where: { id: prop.id } });
    }
    await prisma.appointment.deleteMany({ where: { userId: id } });
    await prisma.favorite.deleteMany({ where: { userId: id } });
    await prisma.inquiry.deleteMany({ where: { userId: id } });
    await prisma.review.deleteMany({ where: { userId: id } });
    await prisma.message.deleteMany({ where: { senderId: id } });
    await prisma.conversation.deleteMany({ where: { userId: id } });
    await prisma.propertyModerationHistory.deleteMany({ where: { changedById: id } });
  },
});
