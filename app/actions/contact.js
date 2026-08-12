"use server";

import prisma from "@/lib/db";

export async function submitContactForm(formData) {
  try {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!firstName || !lastName || !email || !message) {
      return { success: false, error: "All fields are required" };
    }

    await prisma.contactMessage.create({
      data: {
        firstName: firstName.toString(),
        lastName: lastName.toString(),
        email: email.toString(),
        message: message.toString(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Failed to submit message. Please try again later." };
  }
}
