
import mongoose, { Schema, Document } from 'mongoose';

// Interface for Checkup Package Card
interface ICheckupPackageCard {
  image: Buffer;
  title: string;
  testCount: number;
  category: string;
}

// Interface for Checkup Package
interface ICheckupPackage extends Document {
  categories: string[];
  cards: ICheckupPackageCard[];
}

// Schema for Checkup Package Card
const CheckupPackageCardSchema: Schema = new Schema({
  image: { type: Buffer, required: true },
  title: { type: String, required: true },
  testCount: { type: Number, required: true },
  category: { type: String, required: true },
});

// Schema for Checkup Package
const CheckupPackageSchema: Schema = new Schema({
  categories: [{ type: String, required: true }],
  cards: [CheckupPackageCardSchema],
});

// Create and export the model
export const CheckupPackage =
  mongoose.models.CheckupPackage ||
  mongoose.model<ICheckupPackage>("CheckupPackage", CheckupPackageSchema);

