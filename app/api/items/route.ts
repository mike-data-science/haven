import { NextResponse } from "next/server";
import { getItems, addItem, updateItem } from "@/lib/items";

export async function GET() {
    try {
        const items = await getItems();
        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "NU am putut aduce produsele" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, price } = body;

        if (!title || !price) {
            return NextResponse.json(
                { error: "Numele si pretul sunt obbligatorii" },
                { status: 400 }
            );
        }

        const newItem = await addItem({
            title: title,
            price: Number(price),
        });

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Formatul JSON trimis este invalid." },
            { status: 400 }
        );
    }
}

export async function PUT(request: Request, context: any) {
    // support both shapes: { params: { id } } or { params: Promise<{ id }>} from different Next versions
    let id: string | undefined;
    try {
        if (context?.params instanceof Promise) {
            const p = await context.params;
            id = p?.id;
        } else if (context?.params) {
            id = context.params.id;
        }
    } catch (e) {
        // ignore
    }

    const body = await request.json();
    const { title, price } = body;

    const newItem = await updateItem({
        id: Number(id),
        title: title,
        price: Number(price),
    });

    if (!title || !price) {
        return NextResponse.json(
            { error: "Numele si pretul sunt obbligatorii" },
            { status: 400 }
        );
    }
    return NextResponse.json(newItem, { status: 201 });
}