import Contact from "@/models/Contact";

/**
 * Validates a contact submission.
 * @param {Object} data - The submission data
 * @returns {boolean} True if valid, false otherwise
 */
export function validateContact(data) {
  if (!data) return false;

  const { name, email, phone, interest, message } = data;

  // Name validation
  if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
    return false;
  }

  // Email validation
  if (!email || typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
    return false;
  }

  // Phone validation (optional)
  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    return false;
  }

  // Interest validation (optional, must match enum if provided)
  const validInterests = [
    "Provider Credentialing",
    "Provider Enrollment",
    "CAQH Management",
    "NPI Management",
    "ERA / EFT Setup",
    "Full-Service Package",
    "Other",
  ];
  if (interest && (!typeof interest === "string" || !validInterests.includes(interest))) {
    return false;
  }

  // Message validation
  if (!message || typeof message !== "string" || message.trim().length < 10 || message.trim().length > 2000) {
    return false;
  }

  return true;
}

/**
 * Creates a new contact record in the database.
 * @param {Object} contactData - The contact data to save
 * @returns {Promise<Object>} The saved contact Mongoose document
 */
export async function createContact(contactData) {
  // Enforce server-side validation
  if (!validateContact(contactData)) {
    throw new Error("Validation failed.");
  }

  const { name, email, phone, interest, message } = contactData;

  const contact = new Contact({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : "",
    interest: interest || "Other",
    message: message.trim(),
  });

  return await contact.save();
}
