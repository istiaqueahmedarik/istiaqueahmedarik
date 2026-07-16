"use server";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  console.log("Contact Form Submission:", { name, email, message });

  return { success: true };
}
