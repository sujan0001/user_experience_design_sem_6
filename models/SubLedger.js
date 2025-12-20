import mongoose from "mongoose";

const subLedgerSchema = new mongoose.Schema(
  {
    subLedgerName: {
      type: String,
      required: true
    },
    alias: {
      type: String
    },
    generalLedgerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneralLedger",
      required: true
    },
    description: {
      type: String
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("SubLedger", subLedgerSchema);
