import mongoose from "mongoose";

const ledgerGroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true
    },
    alias: {
      type: String
    },
    accountTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountType",
      required: true
    },
    remarks: {
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

export default mongoose.model("LedgerGroup", ledgerGroupSchema);
