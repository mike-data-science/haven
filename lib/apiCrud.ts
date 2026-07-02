import { NextResponse } from "next/server";
import type { EntityTarget, ObjectLiteral } from "typeorm";
import { initializeDB } from "@/lib/db";

type Body = Record<string, unknown>;
type ParamsContext = { params: Promise<{ id: string }> };

type CrudConfig = {
  entity: EntityTarget<ObjectLiteral>;
  entityName: string;
  relations?: string[];
  buildData: (body: Body) => Body;
};

function toId(value: string) {
  const id = Number(value);

  return Number.isInteger(id) && id > 0 ? id : null;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unexpected error";
}

export function numberValue(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : undefined;
}

export function booleanValue(value: unknown) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return Boolean(value);
}

export function dateValue(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  return new Date(String(value));
}

export function relation(value: unknown) {
  const id = numberValue(value);

  return id === undefined ? undefined : { id };
}

export function nullableRelation(value: unknown) {
  if (value === null || value === "") {
    return null;
  }

  return relation(value);
}

export function pickDefined(values: Body) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined)
  );
}

export function createCrudHandlers({
  entity,
  entityName,
  relations = [],
  buildData,
}: CrudConfig) {
  async function findById(id: number) {
    const db = await initializeDB();
    const repo = db.getRepository(entity);

    return repo.findOne({
      where: { id } as ObjectLiteral,
      relations,
    });
  }

  return {
    async GET() {
      try {
        const db = await initializeDB();
        const repo = db.getRepository(entity);
        const rows = await repo.find({
          relations,
          order: { id: "ASC" } as ObjectLiteral,
        });

        return NextResponse.json(rows);
      } catch (error) {
        return NextResponse.json(
          { error: `Failed to load ${entityName}.`, detail: getErrorMessage(error) },
          { status: 500 }
        );
      }
    },

    async POST(request: Request) {
      try {
        const body = (await request.json()) as Body;
        const db = await initializeDB();
        const repo = db.getRepository(entity);
        const row = repo.create(buildData(body));
        const saved = await repo.save(row);

        return NextResponse.json(saved, { status: 201 });
      } catch (error) {
        return NextResponse.json(
          { error: `Failed to create ${entityName}.`, detail: getErrorMessage(error) },
          { status: 400 }
        );
      }
    },

    async GET_BY_ID(_request: Request, { params }: ParamsContext) {
      try {
        const { id: rawId } = await params;
        const id = toId(rawId);

        if (!id) {
          return NextResponse.json({ error: "Invalid id." }, { status: 400 });
        }

        const row = await findById(id);

        if (!row) {
          return NextResponse.json(
            { error: `${entityName} not found.` },
            { status: 404 }
          );
        }

        return NextResponse.json(row);
      } catch (error) {
        return NextResponse.json(
          { error: `Failed to load ${entityName}.`, detail: getErrorMessage(error) },
          { status: 500 }
        );
      }
    },

    async PUT(_request: Request, { params }: ParamsContext) {
      try {
        const { id: rawId } = await params;
        const id = toId(rawId);

        if (!id) {
          return NextResponse.json({ error: "Invalid id." }, { status: 400 });
        }

        const body = (await _request.json()) as Body;
        const row = await findById(id);

        if (!row) {
          return NextResponse.json(
            { error: `${entityName} not found.` },
            { status: 404 }
          );
        }

        Object.assign(row, buildData(body));

        const db = await initializeDB();
        const repo = db.getRepository(entity);
        const saved = await repo.save(row);

        return NextResponse.json(saved);
      } catch (error) {
        return NextResponse.json(
          { error: `Failed to update ${entityName}.`, detail: getErrorMessage(error) },
          { status: 400 }
        );
      }
    },

    async DELETE(_request: Request, { params }: ParamsContext) {
      try {
        const { id: rawId } = await params;
        const id = toId(rawId);

        if (!id) {
          return NextResponse.json({ error: "Invalid id." }, { status: 400 });
        }

        const row = await findById(id);

        if (!row) {
          return NextResponse.json(
            { error: `${entityName} not found.` },
            { status: 404 }
          );
        }

        const db = await initializeDB();
        const repo = db.getRepository(entity);
        await repo.remove(row);

        return NextResponse.json({ message: `${entityName} deleted successfully.` });
      } catch (error) {
        return NextResponse.json(
          { error: `Failed to delete ${entityName}.`, detail: getErrorMessage(error) },
          { status: 500 }
        );
      }
    },
  };
}
