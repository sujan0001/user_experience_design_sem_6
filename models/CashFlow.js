import mongoose from "mongoose";

const cashFlowSchema = new mongoose.Schema(
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
    date: {
      type: Date,
      required: true
    },
    inflow: {
      type: Number,
      default: 0
    },
    outflow: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("CashFlow", cashFlowSchema);
