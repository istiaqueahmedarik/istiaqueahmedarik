"use server";

const MAX_FIELD_LENGTHS = {
  name: 100,
  email: 254,
  message: 2000,
};

function getTrimmedField(formData: FormData, key: "name" | "email" | "message") {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function submitContactForm(formData: FormData) {
  const name = getTrimmedField(formData, "name");
  const email = getTrimmedField(formData, "email");
  const message = getTrimmedField(formData, "message");
  const honeypot = formData.get("company");

  if (honeypot) {
    return { success: true };
  }

  if (name === "") {
    return { success: false, error: "Name is required." };
  }
  if (name.length > MAX_FIELD_LENGTHS.name) {
    return { success: false, error: "Name is too long." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Valid email is required." };
  }
  if (email.length > MAX_FIELD_LENGTHS.email) {
    return { success: false, error: "Email is too long." };
  }
  if (message === "") {
    return { success: false, error: "Message is required." };
  }
  if (message.length > MAX_FIELD_LENGTHS.message) {
    return { success: false, error: "Message is too long." };
  }

  return {
    success: false,
    error: "Contact delivery is not configured yet. Please email me directly.",
  };
}

