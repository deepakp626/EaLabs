"use client";

import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

type RegisterFormValues = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	agree: boolean;
};

type RegisterProps = {
	onSubmit?: (values: { name: string; email: string; password: string; agree: boolean }) => Promise<void> | void;
	isLoading?: boolean;
	error?: string | null;
	className?: string;
	requireAgreement?: boolean;
	onSuccess?: (payload: unknown) => void;
};

const emailRegex = /^(?:[a-zA-Z0-9_'^&+\-])+(?:\.(?:[a-zA-Z0-9_'^&+\-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

function validate(values: RegisterFormValues, requireAgreement: boolean): {
	name?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	agree?: string;
} {
	const errors: {
		name?: string;
		email?: string;
		password?: string;
		confirmPassword?: string;
		agree?: string;
	} = {};

	if (!values.name.trim()) {
		errors.name = "Name is required";
	}
	if (!values.email) {
		errors.email = "Email is required";
	} else if (!emailRegex.test(values.email)) {
		errors.email = "Enter a valid email";
	}
	if (!values.password) {
		errors.password = "Password is required";
	} else if (values.password.length < 6) {
		errors.password = "Password must be at least 6 characters";
	}
	if (!values.confirmPassword) {
		errors.confirmPassword = "Please confirm your password";
	} else if (values.confirmPassword !== values.password) {
		errors.confirmPassword = "Passwords do not match";
	}
	if (requireAgreement && !values.agree) {
		errors.agree = "You must agree to continue";
	}
	return errors;
}

const  Register = ({
	onSubmit,
	isLoading,
	error,
	className,
	requireAgreement = true,
	onSuccess,
}: RegisterProps) => {
	const [values, setValues] = useState<RegisterFormValues>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		agree: false,
	});
	const [touched, setTouched] = useState<{ name: boolean; email: boolean; password: boolean; confirmPassword: boolean; agree: boolean }>(
		{ name: false, email: false, password: false, confirmPassword: false, agree: false }
	);
	const [internalLoading, setInternalLoading] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

	const computedErrors = useMemo(() => validate(values, requireAgreement), [values, requireAgreement]);
	const hasErrors = Object.keys(computedErrors).length > 0;
	const loading = isLoading ?? internalLoading;

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked, type } = event.target;
		setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value } as RegisterFormValues));
	}, []);

	const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
		const { name } = event.target;
		setTouched((prev) => ({ ...prev, [name]: true } as typeof touched));
	}, [touched]);

	const handleSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setSubmitError(null);
			setTouched({ name: true, email: true, password: true, confirmPassword: true, agree: true });
			const errs = validate(values, requireAgreement);
			if (Object.keys(errs).length > 0) return;
			if (isLoading === undefined) setInternalLoading(true);
			try {
				const payload = {
					name: values.name.trim(),
					email: values.email.trim(),
					password: values.password,
					agree: values.agree,
				};
				if (onSubmit) {
					await onSubmit(payload);
					toast.success("Account created");
				} else {
					const res = await fetch("/api/auth/register", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ name: payload.name, email: payload.email, password: payload.password }),
					});
					const data = await res.json();
					if (!res.ok) {
						throw new Error(data?.error || "Registration failed");
					}
					if (onSuccess) onSuccess(data);
					toast.success("Account created");
				}
			} catch (e: unknown) {
				const message = e instanceof Error ? e.message : "Registration failed";
				setSubmitError(message);
				toast.error(message);
			} finally {
				if (isLoading === undefined) setInternalLoading(false);
			}
		},
		[isLoading, onSubmit, onSuccess, requireAgreement, values]
	);

	return (
		<form onSubmit={handleSubmit} className={className} noValidate>
			<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<h2 style={{ margin: 0 }}>Create account</h2>

				<label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
					<span>Name</span>
					<input
						type="text"
						name="name"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Your name"
						aria-invalid={Boolean(touched.name && computedErrors.name)}
						aria-describedby="register-name-error"
						style={{ padding: "10px 12px", border: "1px solid #ccc", borderRadius: 6 }}
					/>
					{touched.name && computedErrors.name ? (
						<span id="register-name-error" style={{ color: "#b00020", fontSize: 12 }}>
							{computedErrors.name}
						</span>
					) : null}
				</label>

				<label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
					<span>Email</span>
					<input
						type="email"
						name="email"
						value={values.email}
						autoComplete="email"
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="you@example.com"
						aria-invalid={Boolean(touched.email && computedErrors.email)}
						aria-describedby="register-email-error"
						style={{ padding: "10px 12px", border: "1px solid #ccc", borderRadius: 6 }}
					/>
					{touched.email && computedErrors.email ? (
						<span id="register-email-error" style={{ color: "#b00020", fontSize: 12 }}>
							{computedErrors.email}
						</span>
					) : null}
				</label>

				<label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
					<span>Password</span>
					<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							value={values.password}
							autoComplete="new-password"
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="••••••••"
							aria-invalid={Boolean(touched.password && computedErrors.password)}
							aria-describedby="register-password-error"
							style={{ flex: 1, padding: "10px 12px", border: "1px solid #ccc", borderRadius: 6 }}
						/>
						<button
							type="button"
							onClick={() => setShowPassword((s) => !s)}
							aria-label={showPassword ? "Hide password" : "Show password"}
							style={{ padding: "8px 10px", border: "1px solid #ccc", borderRadius: 6, background: "#f7f7f7", cursor: "pointer" }}
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
					{touched.password && computedErrors.password ? (
						<span id="register-password-error" style={{ color: "#b00020", fontSize: 12 }}>
							{computedErrors.password}
						</span>
					) : null}
				</label>

				<label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
					<span>Confirm password</span>
					<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
						<input
							type={showConfirmPassword ? "text" : "password"}
							name="confirmPassword"
							value={values.confirmPassword}
							autoComplete="new-password"
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="••••••••"
							aria-invalid={Boolean(touched.confirmPassword && computedErrors.confirmPassword)}
							aria-describedby="register-confirm-error"
							style={{ flex: 1, padding: "10px 12px", border: "1px solid #ccc", borderRadius: 6 }}
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword((s) => !s)}
							aria-label={showConfirmPassword ? "Hide password" : "Show password"}
							style={{ padding: "8px 10px", border: "1px solid #ccc", borderRadius: 6, background: "#f7f7f7", cursor: "pointer" }}
						>
							{showConfirmPassword ? "Hide" : "Show"}
						</button>
					</div>
					{touched.confirmPassword && computedErrors.confirmPassword ? (
						<span id="register-confirm-error" style={{ color: "#b00020", fontSize: 12 }}>
							{computedErrors.confirmPassword}
						</span>
					) : null}
				</label>

				{requireAgreement ? (
					<label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
						<input
							type="checkbox"
							name="agree"
							checked={values.agree}
							onChange={handleChange}
						/>
						<span>I agree to the terms</span>
						{touched.agree && computedErrors.agree ? (
							<span style={{ color: "#b00020", fontSize: 12 }}>{computedErrors.agree}</span>
						) : null}
					</label>
				) : null}

				{submitError || error ? (
					<div role="alert" style={{ color: "#b00020", fontSize: 13 }}>
						{submitError || error}
					</div>
				) : null}

				<button
					type="submit"
					disabled={loading || hasErrors}
					style={{
						padding: "10px 12px",
						borderRadius: 6,
						border: "1px solid #111",
						background: loading || hasErrors ? "#94a3b8" : "#111",
						color: "#fff",
						cursor: loading || hasErrors ? "not-allowed" : "pointer",
					}}
				>
					{loading ? "Creating account..." : "Create account"}
				</button>
			</div>
		</form>
	);
}


export default Register;