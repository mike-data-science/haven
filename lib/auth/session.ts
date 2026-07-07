import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { User } from "@prisma/client";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class UserNotFoundError extends Error {
  constructor(message = "User not found in database") {
    super(message);
    this.name = "UserNotFoundError";
  }
}

/**
 * Retrieves the current authenticated user from PostgreSQL.
 * If the user exists in Clerk but not in PostgreSQL, it creates them.
 * This implements the "lazy loading" sync strategy.
 */
export async function getCurrentUser(): Promise<User> {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new UnauthorizedError("No active session");
  }

  // Check if user exists in our DB
  let user = await prisma.user.findUnique({
    where: { clerkId },
  });

  // If the user doesn't exist yet (first time login), create them
  if (!user) {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(clerkId);
    
    if (!clerkUser) {
       throw new UnauthorizedError("Invalid Clerk user");
    }

    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    if (!primaryEmail) {
      throw new Error("User must have an email address");
    }

    // Name logic: combine first and last, or fallback to username/email prefix
    const name = clerkUser.firstName 
      ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
      : clerkUser.username || primaryEmail.split("@")[0];

    // Create user in PostgreSQL
    user = await prisma.user.create({
      data: {
        clerkId,
        email: primaryEmail,
        name: name,
        avatarUrl: clerkUser.imageUrl,
        // Default role is "USER" as defined in Prisma schema
      },
    });
  }

  return user;
}
