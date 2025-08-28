import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPartner extends Document {
  partnerImage: Buffer | string; // store as buffer or URL
  partnerTitle: string;
}

const PartnerSchema: Schema = new Schema<IPartner>(
  {
    partnerImage: { type: Buffer, required: true }, // or String if storing URL
    partnerTitle: { type: String, required: true },
  },
  { timestamps: true }
);

const Partner: Model<IPartner> =
  mongoose.models.Partner || mongoose.model<IPartner>("Partner", PartnerSchema);

export default Partner;
