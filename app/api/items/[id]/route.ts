import { getItemById, deleteItem, updateItem } from "@/lib/items";
import { NextResponse } from "next/server";

export async function GET(request: Request,{params}: {params: Promise<{id:string}>}){
const {id} = await params;
const item = await getItemById(Number(id));
return NextResponse.json(item)
}

export async function PUT(request: Request, {params}: {params: Promise<{id:string}>}){
const {id} = await params;
const product = await request.json();
const item = await updateItem({...product, id: Number(id)});
return NextResponse.json(item)
}

export async function DELETE(request: Request, {params}: {params: Promise<{id:string}>}){
const {id} = await params;
const item = await deleteItem(Number(id))
return NextResponse.json(item)
}