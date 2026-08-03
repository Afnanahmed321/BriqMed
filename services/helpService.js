import Help from "@/models/Help";

/**
 * Validates a help ticket submission.
 * @param {Object} data - The ticket data
 * @returns {boolean} True if valid, false otherwise
 */
export function validateHelpTicket(data) {
  if (!data) return false;

  const { fullName, email, phone, company, subject, message, attachment } = data;

  // fullName validation
  if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2 || fullName.trim().length > 100) {
    return false;
  }

  // email validation
  if (!email || typeof email !== "string" || !/\S+@\S+\.\S+/.test(email)) {
    return false;
  }

  // phone validation (optional)
  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    return false;
  }

  // company validation (optional)
  if (company !== undefined && company !== null && typeof company !== "string") {
    return false;
  }

  // subject validation
  const validSubjects = [
    "General Inquiry",
    "Provider Onboarding",
    "NPI Management",
    "Payer Enrollment",
    "CAQH Management",
    "ERA / EFT Setup",
    "License Tracking",
    "Billing & Payments",
    "Technical Support",
    "Other",
  ];
  if (!subject || typeof subject !== "string" || !validSubjects.includes(subject)) {
    return false;
  }

  // message validation
  if (!message || typeof message !== "string" || message.trim().length < 10 || message.trim().length > 3000) {
    return false;
  }

  // attachment validation (optional)
  if (attachment) {
    const { fileName, fileUrl, fileType, fileSize } = attachment;
    if (fileName && typeof fileName !== "string") return false;
    if (fileUrl && typeof fileUrl !== "string") return false;
    if (fileType && typeof fileType !== "string") return false;
    if (fileSize && typeof fileSize !== "number") return false;
  }

  return true;
}

/**
 * Creates a new help ticket in the database.
 * @param {Object} ticketData - The ticket data to save
 * @returns {Promise<Object>} The saved help ticket document
 */
export async function createHelpTicket(ticketData) {
  if (!validateHelpTicket(ticketData)) {
    throw new Error("Validation failed.");
  }

  const { fullName, email, phone, company, subject, message, attachment } = ticketData;

  const ticketId = "TKT-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  const ticket = new Help({
    ticketId,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : "",
    company: company ? company.trim() : "",
    subject,
    message: message.trim(),
    attachment: attachment || undefined,
  });

  return await ticket.save();
}
