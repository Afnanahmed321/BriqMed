import { connectDB } from "@/lib/mongodb";
import { createHelpTicket } from "@/services/helpService";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const ticket = await createHelpTicket(body);

    return Response.json(
      {
        success: true,
        message: "Help ticket submitted successfully.",
        data: ticket,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in Help API:", error);
    return Response.json(
      {
        success: false,
        message: error.message === "Validation failed." ? "Validation failed." : "Internal server error.",
      },
      {
        status: error.message === "Validation failed." ? 400 : 500,
      }
    );
  }
}