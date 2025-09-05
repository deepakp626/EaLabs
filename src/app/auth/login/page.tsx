"use client";

import React from "react";
import Login from "@/components/auth/Login";

interface LoginProps {
	email: string;
	password: string;
	remember: boolean;
}

export default function Page() {
	const handleLogin = async ({
		email,
		password,
		remember,
	}: LoginProps) => {
		// Replace with your auth API / NextAuth signIn
		console.log("login", { email, password, remember });
	};

	return (
		<div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
			<Login onSubmit={handleLogin} />
		</div>
	);
}


