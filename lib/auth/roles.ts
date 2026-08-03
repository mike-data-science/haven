import { getCurrentUser, UnauthorizedError } from "./session";
import { Role } from "@prisma/client";
import { notFound } from "next/navigation";

/**
 * Ensures the currently authenticated user has the required role(s).
 * Calls notFound() if they do not, rendering a 404 page for unauthorized access.
 */
export async function requireRole(allowedRoles: Role | Role[]) {
  const user = await getCurrentUser();
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(user.role)) {
    notFound();
  }

  return user;
}
