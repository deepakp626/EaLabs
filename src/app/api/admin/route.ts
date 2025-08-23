import { NextRequest, NextResponse } from "next/server";
import Hero from '@/model/heroModel'

export async function POST(req: NextRequest) {
  try {

    const formData = await req.formData();
    const heroimage = formData.get("heroimage") as File;
    const cards = JSON.parse(formData.get("cards") as string);

    if (!heroimage || !cards) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const heroimageBuffer = Buffer.from(await heroimage.arrayBuffer());

    const newHero = new Hero({
      heroimage: heroimageBuffer,
      cards: cards,
    });

    await newHero.save();

    return NextResponse.json(
      { message: "Hero section created successfully", hero: newHero },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating hero section" },
      { status: 500 }
    );
  }
}
