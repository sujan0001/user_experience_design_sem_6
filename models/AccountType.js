import mongoose from "mongoose";

const accountTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Asset", "Liability", "Equity", "Revenue", "Expense"],
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

export default mongoose.model("AccountType", accountTypeSchema);
