"use server";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function updateThemeColor(color: string) {
  const user = await getCurrentUser();

  // Validate hex color format
  if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
    throw new Error("Invalid color format. Must be a 6-digit hex color (e.g. #2563eb).");
  }
  
  await prisma.user.update({
    where: { id: user.id },
    data: { themeColor: color }
  });
  
  revalidatePath("/dashboard", "layout");
  return { success: true };
}
