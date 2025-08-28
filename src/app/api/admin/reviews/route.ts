import { NextRequest, NextResponse } from 'next/server';
import Review from '@/models/review';

export async function POST(req: NextRequest) {

  try {
    const formData = await req.formData();
    const userName = formData.get('userName') as string;
    const userReview = formData.get('userReview') as string;
    const rating = formData.get('rating') as string;
    const imageFile = formData.get('image') as File;

    if (!userName || !userReview || !rating || !imageFile) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    const newReview = new Review({
      userName,
      userReview,
      rating: Number(rating),
      image: imageBuffer,
    });

    await newReview.save();

    return NextResponse.json({ message: 'Review added successfully', review: newReview }, { status: 201 });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reviews = await Review.find({});
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
