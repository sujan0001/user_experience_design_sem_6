import mongoose from "mongoose";

const generalLedgerSchema = new mongoose.Schema(
  {
    ledgerName: {
      type: String,
      required: true
    },
    alias: {
      type: String
    },
    ledgerGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LedgerGroup",
      required: true
    },
    description: {
      type: String
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    isCashOrBank: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("GeneralLedger", generalLedgerSchema);
