import mongoose, { Schema, Document } from "mongoose";

export interface IMedicalHistory extends Document {
  age: string;
  weight: string;
  height: string;
  allergies: string;
  medications: string;
  medicalConditions: string;
}

const MedicalHistorySchema = new Schema<IMedicalHistory>(
  {
    age: { type: String, required: true },
    weight: { type: String, required: true },
    height: { type: String, required: true },
    allergies: { type: String, required: true },
    medications: { type: String, required: true },
    medicalConditions: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent multiple model declaration issue
const MedicalHistory =
  mongoose.models.MedicalHistory ||
  mongoose.model<IMedicalHistory>("MedicalHistory", MedicalHistorySchema);

export default MedicalHistory;
