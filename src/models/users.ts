import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

const UserSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, lowercase: true, unique: true, index: true },
		passwordHash: { type: String, required: true },
		role: { type: String, enum: ["admin", "user"], default: "user", index: true },
		resetPasswordToken: { type: String, required: false, index: true },
		resetPasswordExpires: { type: Date, required: false },
	},
	{ timestamps: true }
);

export type UserDocument = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

export async function getUserModel(): Promise<Model<UserDocument>> {
	return (mongoose.models.User as Model<UserDocument>) || mongoose.model<UserDocument>("User", UserSchema);
}

export async function createUser(user: { name: string; email: string; passwordHash: string; role?: "admin" | "user" }) {
	const User = await getUserModel();
	const created = await User.create({
		name: user.name,
		email: user.email.toLowerCase(),
		passwordHash: user.passwordHash,
		role: user.role ?? "user",
	});
	return created;
}

export async function findUserByEmail(email: string) {
	const User = await getUserModel();
	return User.findOne({ email: email.toLowerCase() }).exec();
}

export async function setResetToken(userId: string, token: string, expiresAt: Date) {
	const User = await getUserModel();
	await User.updateOne({ _id: userId }, { $set: { resetPasswordToken: token, resetPasswordExpires: expiresAt } }).exec();
}

export async function findUserByResetToken(token: string) {
	const User = await getUserModel();
	return User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } }).exec();
}

export async function updateUserPassword(userId: string, passwordHash: string) {
	const User = await getUserModel();
	await User.updateOne(
		{ _id: userId },
		{ $set: { passwordHash }, $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 } }
	).exec();
}
