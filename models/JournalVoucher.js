import mongoose from "mongoose";

const journalVoucherSchema = new mongoose.Schema(
  {
    voucherNumber: {
      type: String,
      required: true,
      unique: true
    },
    date: {
      type: Date,
      required: true
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    remarks: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("JournalVoucher", journalVoucherSchema);
