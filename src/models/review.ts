import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  userName: string;
  userReview: string;
  rating: number;
  image: Buffer;
}

const ReviewSchema: Schema = new Schema({
  userName: { type: String, required: true },
  userReview: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: Buffer, required: true },
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);