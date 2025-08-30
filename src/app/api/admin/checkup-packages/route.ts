import { NextRequest, NextResponse } from "next/server";
import { CheckupPackage } from "@/models/CheckupPackage";

// Get all checkup packages
export async function GET() {
  try {
    const packages = await CheckupPackage.find();

    return NextResponse.json(
      { message: "Checkup packages retrieved successfully", data: packages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving checkup packages:", error);
    return NextResponse.json(
      { error: "Failed to retrieve checkup packages" },
      { status: 500 }
    );
  }
}


// Create or update checkup packages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { categories, cards } = body;

    if (!categories || !cards) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Check if a checkup package already exists
    const existingPackage = await CheckupPackage.findOne();

    if (existingPackage) {
      // Update existing package
      existingPackage.categories = categories;
      existingPackage.cards = cards.map((c: any) => ({
        image: Array.isArray(c.image?.data)
          ? Buffer.from(c.image.data) // when coming as { type: 'Buffer', data: [...] }
          : Buffer.from(c.image, "base64"), // when coming as base64 string
        title: c.title,
        testCount: c.testCount,
        category: c.category,
      }));

    await existingPackage.save();

    return NextResponse.json(
      { message: "Checkup package updated successfully!", data: existingPackage },
      { status: 200 }
    );
  } else {
    // Create new package
    const newPackage = new CheckupPackage({
      categories: categories,
      cards: cards.map((c: any) => ({
        image: Array.isArray(c.image?.data)
          ? Buffer.from(c.image.data) // when coming as { type: 'Buffer', data: [...] }
          : Buffer.from(c.image, "base64"), // when coming as base64 string
        title: c.title,
        testCount: c.testCount,
        category: c.category,
      })),
    });

    await newPackage.save();

    return NextResponse.json(
      { message: "Checkup package created successfully!", data: newPackage },
      { status: 201 }
    );
  }
} catch (error) {
  console.error("Error creating/updating checkup package:", error);
  return NextResponse.json(
    { error: "Failed to create/update checkup package" },
    { status: 500 }
  );
}
}
