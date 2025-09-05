import { NextResponse } from "next/server";
import { scryptSync, randomBytes } from "crypto";
import { findUserByResetToken, updateUserPassword } from "../../../../models/users";

type ResetBody = { token?: string; password?: string };

function hashPassword(plain: string): string {
	const salt = randomBytes(16);
	const hash = scryptSync(plain, salt, 64);
	return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as ResetBody;
		const token = body.token ?? "";
		const password = body.password ?? "";

		if (!token) return NextResponse.json({ error: "Token is required" }, { status: 400 });
		if (!password || password.length < 6)
			return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });

		const user = await findUserByResetToken(token);
		if (!user) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });

		const passwordHash = hashPassword(password);
		await updateUserPassword(user._id.toString(), passwordHash);

		return NextResponse.json({ ok: true });
	} catch (error) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}


