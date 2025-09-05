import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../../../../models/users";

type LoginBody = {
	email?: string;
	password?: string;
};

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as LoginBody;
		const email = (body.email ?? "").trim().toLowerCase();
		const password = body.password ?? "";

		if (!email || !password) {
			return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
		}

		const user = await findUserByEmail(email);
		if (!user) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		const isMatch = await bcrypt.compare(password, user.passwordHash);
		if (!isMatch) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		// Admin gate: require match with ADMIN_EMAIL if set
		const adminEmail = process.env.ADMIN_EMAIL;
		if (adminEmail && user.email.toLowerCase() !== adminEmail.toLowerCase()) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		const secret = process.env.JWT_SECRET;
		if (!secret) {
			return NextResponse.json({ error: "Server misconfiguration: JWT_SECRET missing" }, { status: 500 });
		}

		const token = jwt.sign(
			{ sub: user._id?.toString?.() ?? "", email: user.email, name: user.name, role: (user as any).role ?? "user" },
			secret,
			{ expiresIn: "7d" }
		);


		return NextResponse.json({ token, message: "Login successful" });
	} catch (error) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}


