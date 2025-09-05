import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../../../../models/users";

type RegisterBody = {
	name?: string;
	email?: string;
	password?: string;
	role?:string
};

function isValidEmail(email: string): boolean {
	return /^(?:[a-zA-Z0-9_'^&+\-])+(?:\.(?:[a-zA-Z0-9_'^&+\-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email);
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as RegisterBody;
		const name = (body.name ?? "").trim();
		const email = (body.email ?? "").trim().toLowerCase();
		const password = body.password ?? "";
		const role = body.role ?? "User";

		if (!name) {
			return NextResponse.json({ error: "Name is required" }, { status: 400 });
		}
		if (!email || !isValidEmail(email)) {
			return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
		}
		if (!password || password.length < 6) {
			return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
		}

		const existing = await findUserByEmail(email);
		if (existing) {
			return NextResponse.json({ error: "Email already in use" }, { status: 409 });
		}

		const passwordHash = await bcrypt.hash(password, 12);
		const created = await createUser({ name, email, passwordHash,role });

		return NextResponse.json(
			{
				user: {
					id: created._id.toString(),
					name: created.name,
					email: created.email,

					createdAt: (created as any).createdAt ?? new Date(),
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("error -->> ", error);
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}


