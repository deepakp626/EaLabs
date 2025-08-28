import mongoose, { Schema, Document, Model } from "mongoose";

// ------------------- TAB -------------------
export interface ITab extends Document {
  category: string;
}

const TabSchema = new Schema<ITab>(
  {
    category: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Tab: Model<ITab> =
  mongoose.models.Tab || mongoose.model<ITab>("Tab", TabSchema);

// ------------------- TAB CARD -------------------
export interface ITabCard extends Document {
  title: string;
  description: string;
  url: string;
  tabId: mongoose.Types.ObjectId | ITab; // reference to Tab
}

const TabCardSchema = new Schema<ITabCard>(
  {
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    tabId: { type: Schema.Types.ObjectId, ref: "Tab", required: true },
  },
  { timestamps: true }
);

export const TabCard: Model<ITabCard> =
  mongoose.models.TabCard || mongoose.model<ITabCard>("TabCard", TabCardSchema);
