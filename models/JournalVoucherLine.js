import mongoose from "mongoose";

const journalVoucherLineSchema = new mongoose.Schema(
  {
    journalVoucherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JournalVoucher",
      required: true
    },
    generalLedgerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneralLedger",
      required: true
    },
    subLedgerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubLedger"
    },
    debit: {
      type: Number,
      default: 0
    },
    credit: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("JournalVoucherLine", journalVoucherLineSchema);
