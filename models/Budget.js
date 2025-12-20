import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    generalLedgerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneralLedger",
      required: true
    },
    fiscalYear: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Budget", budgetSchema);
