import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth/roles";
import { UnauthorizedError } from "@/lib/auth/session";
import { Role } from "@prisma/client";
import { checkRateLimit } from "@/lib/rateLimit";
import { auditLog } from "@/lib/auditLog";
import { z } from "zod";

type Body = Record<string, unknown>;
type ParamsContext = { params: Promise<{ id: string }> };

type CrudConfig = {
  modelName: keyof typeof prisma;
  entityName: string;
  include?: Record<string, boolean>;
  allowedRoles?: Role[];
  ownershipField?: string;
  schema?: z.ZodSchema;
  buildData: (body: Body, user?: { id: number; role: Role }, existing?: any) => Body;
  beforeDelete?: (id: number) => Promise<void>;
};

function toId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unexpected error";
}

export function numberValue(value: unknown) {
  if (value === undefined || value === null || value === "") return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

export function booleanValue(value: unknown) {
  if (value === undefined) return undefined;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return Boolean(value);
}

export function dateValue(value: unknown) {
  if (value === undefined || value === null || value === "") return undefined;
  return new Date(String(value));
}

export function pickDefined(values: Body) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined)
  );
}

export function createCrudHandlers({
  modelName,
  entityName,
  include,
  allowedRoles = ['ADMIN'],
  ownershipField,
  schema,
  buildData,
  beforeDelete,
}: CrudConfig) {
  const getModel = () => (prisma as any)[modelName as string] as any;

  async function findById(id: number) {
    return getModel().findUnique({
      where: { id },
      include,
    });
  }

  return {
    async GET(request: Request) {
      const rl = checkRateLimit(request);
      if (rl) return rl;

      try {
        const user = await requireRole(allowedRoles);
        
        let where = {};
        if (ownershipField && user.role !== 'ADMIN') {
          where = { [ownershipField]: user.id };
        }

        const rows = await getModel().findMany({
          where,
          include,
          orderBy: { id: "asc" },
        });
        return NextResponse.json(rows);
      } catch (error) {
        return NextResponse.json(
          { 
            error: `Failed to load ${entityName}.`, 
            ...(process.env.NODE_ENV !== 'production' && { detail: getErrorMessage(error) }) 
          },
          { status: error instanceof UnauthorizedError ? 401 : 500 }
        );
      }
    },

    async POST(request: Request) {
      const rl = checkRateLimit(request);
      if (rl) return rl;

      try {
        const user = await requireRole(allowedRoles);
        const body = (await request.json()) as Body;
        
        if (schema) {
          const result = schema.safeParse(body);
          if (!result.success) {
            return NextResponse.json(
              { error: "Validation failed", issues: result.error.errors },
              { status: 400 }
            );
          }
        }

        let data = buildData(body, user);
        
        // Auto-inject ownership for both ADMIN and normal users if field exists
        if (ownershipField) {
          data[ownershipField] = user.id;
        }

        const saved = await getModel().create({
          data,
          include,
        });

        auditLog({
          action: `${modelName as string}.create`,
          actorId: user.id,
          actorRole: user.role,
          targetType: modelName as string,
          targetId: saved.id,
        });

        return NextResponse.json(saved, { status: 201 });
      } catch (error) {
        return NextResponse.json(
          { 
            error: `Failed to create ${entityName}.`, 
            ...(process.env.NODE_ENV !== 'production' && { detail: getErrorMessage(error) }) 
          },
          { status: error instanceof UnauthorizedError ? 401 : 400 }
        );
      }
    },

    async GET_BY_ID(request: Request, { params }: ParamsContext) {
      const rl = checkRateLimit(request);
      if (rl) return rl;

      try {
        const user = await requireRole(allowedRoles);
        const { id: rawId } = await params;
        const id = toId(rawId);
        if (!id) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

        const row = await findById(id);
        if (!row) {
          return NextResponse.json(
            { error: `${entityName} not found.` },
            { status: 404 }
          );
        }

        if (ownershipField && user.role !== 'ADMIN' && row[ownershipField] !== user.id) {
          return NextResponse.json({ error: "Access denied." }, { status: 403 });
        }

        return NextResponse.json(row);
      } catch (error) {
        return NextResponse.json(
          { 
            error: `Failed to load ${entityName}.`, 
            ...(process.env.NODE_ENV !== 'production' && { detail: getErrorMessage(error) }) 
          },
          { status: error instanceof UnauthorizedError ? 401 : 500 }
        );
      }
    },

    async PUT(request: Request, { params }: ParamsContext) {
      const rl = checkRateLimit(request);
      if (rl) return rl;

      try {
        const user = await requireRole(allowedRoles);
        const { id: rawId } = await params;
        const id = toId(rawId);
        if (!id) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

        const body = (await request.json()) as Body;
        
        if (schema) {
          const result = schema.safeParse(body);
          if (!result.success) {
            return NextResponse.json(
              { error: "Validation failed", issues: result.error.errors },
              { status: 400 }
            );
          }
        }
        
        const existing = await findById(id);
        if (!existing) {
          return NextResponse.json(
            { error: `${entityName} not found.` },
            { status: 404 }
          );
        }

        if (ownershipField && user.role !== 'ADMIN' && existing[ownershipField] !== user.id) {
          return NextResponse.json({ error: "Access denied." }, { status: 403 });
        }

        let data = buildData(body, user, existing);
        if (ownershipField) {
          data[ownershipField] = existing[ownershipField]; // Prevent changing owner
        }

        const saved = await getModel().update({
          where: { id },
          data,
          include,
        });

        auditLog({
          action: `${modelName as string}.update`,
          actorId: user.id,
          actorRole: user.role,
          targetType: modelName as string,
          targetId: id,
        });

        return NextResponse.json(saved);
      } catch (error) {
        return NextResponse.json(
          { 
            error: `Failed to update ${entityName}.`, 
            ...(process.env.NODE_ENV !== 'production' && { detail: getErrorMessage(error) }) 
          },
          { status: error instanceof UnauthorizedError ? 401 : 400 }
        );
      }
    },

    async DELETE(request: Request, { params }: ParamsContext) {
      const rl = checkRateLimit(request);
      if (rl) return rl;

      try {
        const user = await requireRole(allowedRoles);
        const { id: rawId } = await params;
        const id = toId(rawId);
        if (!id) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

        const existing = await findById(id);
        if (!existing) {
          return NextResponse.json(
            { error: `${entityName} not found.` },
            { status: 404 }
          );
        }

        if (ownershipField && user.role !== 'ADMIN' && existing[ownershipField] !== user.id) {
          return NextResponse.json({ error: "Access denied." }, { status: 403 });
        }

        if (beforeDelete) {
          await beforeDelete(id);
        }

        await getModel().delete({ where: { id } });

        auditLog({
          action: `${modelName as string}.delete`,
          actorId: user.id,
          actorRole: user.role,
          targetType: modelName as string,
          targetId: id,
        });

        return NextResponse.json({ message: `${entityName} deleted successfully.` });
      } catch (error) {
        return NextResponse.json(
          { 
            error: `Failed to delete ${entityName}.`, 
            ...(process.env.NODE_ENV !== 'production' && { detail: getErrorMessage(error) }) 
          },
          { status: error instanceof UnauthorizedError ? 401 : 500 }
        );
      }
    },
  };
}
