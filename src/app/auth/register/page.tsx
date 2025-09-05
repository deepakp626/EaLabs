"use client";

import React from "react";
import Register from "@/components/auth/Register";

interface RegisterValues {
	name: string;
	email: string;
	password: string;
	agree: boolean;
}

export default function Page() {
	const handleRegister = async ({ name, email, password, agree }: RegisterValues) => {
		// Replace with your registration API call
		console.log("register", { name, email, password, agree });
	};

	return (
		<div style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
			<Register onSubmit={handleRegister} />
		</div>
	);
}


