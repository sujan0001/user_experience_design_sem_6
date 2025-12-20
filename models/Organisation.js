import mongoose from "mongoose";

const organisationSchema = new mongoose.Schema(
  {
    organisationName: {
      type: String,
      required: true,
      trim: true
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Organisation", organisationSchema);
