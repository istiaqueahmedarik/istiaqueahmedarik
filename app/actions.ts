"use server";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (typeof name !== "string" || name.trim() === "") {
    return { success: false, error: "Name is required." };
  }
  if (typeof email !== "string" || !email.includes("@")) {
    return { success: false, error: "Valid email is required." };
  }
  if (typeof message !== "string" || message.trim() === "") {
    return { success: false, error: "Message is required." };
  }

  console.log("Contact Form Submission:", { name, email, message });

  return { success: true };
}
