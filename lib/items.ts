import { promises as fs } from "fs";
import path from "path";
import { Product } from "@/lib/data";

const dbPath = path.join(process.cwd(), "lib", "db.json");

async function readProducts(): Promise<Product[]> {
  const file = await fs.readFile(dbPath, "utf8");
  return JSON.parse(file) as Product[];
}

async function writeProducts(products: Product[]) {
  await fs.writeFile(dbPath, JSON.stringify(products, null, 2), "utf8");
}

export const getItems = async (): Promise<Product[]> => {
  return await readProducts();
};

export const getItemById = async (id: number): Promise<Product | undefined> => {
  const products = await readProducts();
  return products.find((item) => item.id === id);
};

export const addItem = async (item: Omit<Product, "id">): Promise<Product> => {
  const products = await readProducts();
  const nextId = products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1;
  const newItem: Product = {
    ...item,
    id: nextId,
  };
  products.push(newItem);
  await writeProducts(products);
  return newItem;
};
export const deleteItem = async (id: number ): Promise<Product | undefined> =>{
  const products = await readProducts();
  const index = products.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  const [deleted] = products.splice(index, 1);
  await writeProducts(products);
  return deleted;
}

export const updateItem = async (item: Product): Promise<Product> => {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === item.id);
  if (index === -1) {
    throw new Error(`Product with id ${item.id} not found`);
  }
  products[index] = { ...item };
  await writeProducts(products);
  return products[index];
}
