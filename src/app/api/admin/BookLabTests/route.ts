
import { NextResponse } from "next/server";
import { Tab, TabCard } from "@/models/LabTests";

// ------------------- POST METHOD -------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, title, description, url } = body;

    if (!category || !title) {
      return NextResponse.json({ error: "Category and title are required" }, { status: 400 });
    }

    // Check if the category already exists
    let existingTab = await Tab.findOne({ category });

    if (!existingTab) {
      // If the category doesn't exist, create a new Tab
      existingTab = await Tab.create({ category });
    }

    // Create a new TabCard associated with the existing or newly created Tab
    const newCard = await TabCard.create({
      title,
      description,
      url,
      tabId: existingTab._id
    });

    // Return both the Tab and new TabCard
    return NextResponse.json({
      tab: existingTab,
      card: newCard
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ------------------- GET METHOD -------------------
export async function GET(req: Request) {
  try {
    // Fetch all Tabs
    const tabs = await Tab.find();

    // Fetch all TabCards and populate the tabId field to get tab details
    const tabcards = await TabCard.find().populate("tabId");

    return NextResponse.json({ tabs, tabcards }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
