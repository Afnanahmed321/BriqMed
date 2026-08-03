import { connectDB } from "@/lib/mongodb";
import { createContact } from "@/services/contactService";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    await createContact(body);

    return Response.json(
      {
        success: true,
        message: "Message submitted successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in Contact API:", error);

    // Return standard error response
    return Response.json(
      {
        success: false,
        message: "Validation failed.",
      },
      {
        status: error.message === "Validation failed." ? 400 : 500,
      }
    );
  }
}