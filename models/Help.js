import mongoose from "mongoose";

const helpSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    subject: {
      type: String,
      required: true,
      enum: [
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
      ],
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 3000,
    },

    attachment: {
      fileName: String,
      fileUrl: String,
      fileType: String,
      fileSize: Number,
    },

    status: {
      type: String,
      enum: [
        "new",
        "open",
        "in-progress",
        "resolved",
        "closed",
      ],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Help ||
  mongoose.model("Help", helpSchema);