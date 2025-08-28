import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface
export interface IHealthConcern extends Document {
  title: string;
  image: Buffer; // store as binary data
}

// Schema
const HealthConcernSchema: Schema<IHealthConcern> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Buffer,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError during hot-reload
const HealthConcern: Model<IHealthConcern> =
  mongoose.models.HealthConcern ||
  mongoose.model<IHealthConcern>("HealthConcern", HealthConcernSchema);

export default HealthConcern;
