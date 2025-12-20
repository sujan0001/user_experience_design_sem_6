import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectCode: {
      type: String,
      required: true
    },
    projectName: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ["active", "completed", "on-hold"],
      default: "active"
    },
    organisationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

