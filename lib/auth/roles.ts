import { getCurrentUser, UnauthorizedError } from "./session";
import { Role } from "@prisma/client";

/**
 * Ensures the currently authenticated user has the required role(s).
 * Throws UnauthorizedError if they do not.
 */
export async function requireRole(allowedRoles: Role | Role[]) {
  const user = await getCurrentUser();
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(user.role)) {
    throw new UnauthorizedError(`Action requires one of the following roles: ${roles.join(", ")}`);
  }

  return user;
}
