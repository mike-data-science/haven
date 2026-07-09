"use server";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function updateThemeColor(color: string) {
  const user = await getCurrentUser();
  
  await prisma.user.update({
    where: { id: user.id },
    data: { themeColor: color }
  });
  
  revalidatePath("/dashboard", "layout");
  return { success: true };
}
