import { NextRequest, NextResponse } from "next/server";
import Hero from '@/model/heroModel';

async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(req: NextRequest) {
  try {
    console.log("POST request received");

    const formData = await req.formData();

    // ✅ Hero image
    const heroImageFile = formData.get("heroImage") as File | null;
    if (!heroImageFile) {
      return NextResponse.json({ message: "Hero image is required" }, { status: 400 });
    }
    const heroImageBuffer = await fileToBuffer(heroImageFile);

    // ✅ Cards
    const cards: { title: string; image: Buffer }[] = [];
    for (let i = 1; i <= 3; i++) {
      const cardTitle = formData.get(`cardTitle${i}`) as string | null;
      const cardImageFile = formData.get(`cardImage${i}`) as File | null;

      if (!cardTitle || !cardImageFile) {
        return NextResponse.json(
          { message: `Card ${i} is missing title or image` },
          { status: 400 }
        );
      }

      const cardImageBuffer = await fileToBuffer(cardImageFile);
      cards.push({ title: cardTitle, image: cardImageBuffer });
    }

    console.log(heroImageBuffer);
    console.log(cards);

    // ✅ Find existing hero data or create new one
    let hero = await Hero.findOne();
    
    if (hero) {
      // Update existing record
      hero.heroimage = heroImageBuffer;
      hero.cards = cards;
      await hero.save();
    } else {
      // Create new record
      hero = new Hero({
        heroimage: heroImageBuffer,
        cards,
      });
      await hero.save();
    }

    return NextResponse.json(
      { message: hero ? "Hero updated successfully" : "Hero created successfully", hero },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving hero data:", error);
    return NextResponse.json({ message: "Error saving hero data" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const heroData = await Hero.find(); // Get the most recent entry
    
    if (!heroData) {
      return NextResponse.json({ message: "No hero data found" }, { status: 404 });
    }

    return NextResponse.json(heroData, { status: 200 });

  } catch (error) {
    console.error("Error fetching hero data:", error);
    return NextResponse.json(
      { message: "Error fetching hero data" },
      { status: 500 }
    );
  }
}