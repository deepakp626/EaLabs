import { NextRequest, NextResponse } from "next/server";
import HealthConcern from "@/models/HealthConcern";

// Convert File to Buffer
async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// POST: create new record with image buffer
export async function POST(req: NextRequest) {

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !imageFile) {
      return NextResponse.json({ error: "Missing title or image" }, { status: 400 });
    }

    const imageBuffer = await fileToBuffer(imageFile);

    const newConcern = await HealthConcern.create({
      title,
      image: imageBuffer,
    });

    return NextResponse.json(newConcern, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create health concern" }, { status: 500 });
  }
}

// GET: fetch all concerns (image as base64 for frontend)
export async function GET() {

  try {
    const concerns = await HealthConcern.find();

    const formatted = concerns.map((c) => ({
      _id: c._id,
      title: c.title,
      image: c.image.toString("base64"), // convert Buffer → base64
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch concerns" }, { status: 500 });
  }
}

// DELETE /api/healthconcerns/:id
export async function DELETE( req: NextRequest, { params }: { params: { id: string } } ) {

  try {
    const { id } = params;

    const deleted = await HealthConcern.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Health concern not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Health concern deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete health concern" },
      { status: 500 }
    );
  }
}