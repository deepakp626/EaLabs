
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = body.name || 'World';
  return NextResponse.json({ message: `Hello, ${name}!` });
}

export async function PUT(request: Request) {
  return NextResponse.json({ message: "Hello from PUT request!" });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Hello from DELETE request!" });
}
