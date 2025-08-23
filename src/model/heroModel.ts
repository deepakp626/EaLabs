import mongoose, { Document, Schema, model } from "mongoose";

// Interface for the Hero document
interface IHero extends Document {
  heroimage: Buffer;
  cards: ICard[];
}

interface ICard extends Document {
  title: string;
  image: Buffer; // or String if you are storing image URL instead of binary
}

// Schema for the cards 
const cardSchema = new Schema<ICard>({
  title: { type: String, required: true },
  image: { type: Buffer, required: true }, // change to String if URL
});

// Schema for the Hero model
const heroSchema = new Schema<IHero>({
  heroimage: { type: Buffer, required: true },
  cards: { type: [cardSchema], required: true },
});

// Create and export the Mongoose model
const Hero = mongoose.models.Hero || model<IHero>("Hero", heroSchema);

export default Hero;
