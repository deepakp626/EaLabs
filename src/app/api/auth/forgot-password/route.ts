import { NextResponse } from "next/server";
import { randomBytes, scryptSync } from "crypto";
import { findUserByEmail, setResetToken } from "../../../../models/users";

type ForgotBody = { email?: string };

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as ForgotBody;
		const email = (body.email ?? "").trim().toLowerCase();
		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		const user = await findUserByEmail(email);
		// Always respond 200 to avoid user enumeration
		if (!user) {
			return NextResponse.json({ ok: true });
		}

		const token = randomBytes(32).toString("hex");
		const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes
		await setResetToken(user._id.toString(), token, expires);

		// TODO: send email with token link (e.g., /auth/reset-password?token=...)
		return NextResponse.json({ ok: true });
	} catch (error) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}


