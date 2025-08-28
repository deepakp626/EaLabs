import { NextResponse } from "next/server";
import Partner from "@/models/Partners";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const partnerImageFile = formData.get("partnerImage") as File;
        const partnerTitle = formData.get("partnerTitle");

        let partnerImageBase64 = '';

        if (partnerImageFile) {
            const arrayBuffer = await partnerImageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            partnerImageBase64 = `data:${partnerImageFile.type};base64,${buffer.toString('base64')}`;
        }

        if (!partnerTitle || !partnerImageBase64) {
            return NextResponse.json(
                { error: "Partner title and partner image are required" },
                { status: 400 }
            );
        }

        const partner = new Partner({
            partnerImage: partnerImageBase64,
            partnerTitle,
        });

        await partner.save();

        return NextResponse.json(partner, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const partners = await Partner.find();
        return NextResponse.json(partners, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}