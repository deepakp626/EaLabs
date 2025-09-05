"use client";

import React, { useCallback, useMemo, useState } from "react";
import axiosInstance from "@/lib/axios";

type LoginFormValues = {
	email: string;
	password: string;
	remember: boolean;
};

type LoginProps = {
	onSubmit?: (values: { email: string; password: string; remember: boolean }) => Promise<void> | void;
	isLoading?: boolean;
	error?: string | null;
	className?: string;
	showRemember?: boolean;
	showForgotLink?: boolean;
	onForgotPassword?: () => void;
	onSuccess?: (payload: unknown) => void;
};

const emailRegex = /^(?:[a-zA-Z0-9_'^&+\-])+(?:\.(?:[a-zA-Z0-9_'^&+\-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

function validate(values: LoginFormValues): { email?: string; password?: string } {
	const errors: { email?: string; password?: string } = {};
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
	return errors;
}

export default function Login({
	onSubmit,
	isLoading,
	error,
	className,
	showRemember = true,
	showForgotLink = true,
	onForgotPassword,
	onSuccess,
}: LoginProps) {
	const [values, setValues] = useState<LoginFormValues>({ email: "", password: "", remember: false });
	const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({ email: false, password: false });
	const [internalLoading, setInternalLoading] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const computedErrors = useMemo(() => validate(values), [values]);
	const hasErrors = Object.keys(computedErrors).length > 0;
	const loading = isLoading ?? internalLoading;

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value, checked, type } = event.target;
			setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value } as LoginFormValues));
		},
		[]
	);

	const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
		const { name } = event.target;
		setTouched((prev) => ({ ...prev, [name]: true } as { email: boolean; password: boolean }));
	}, []);

	const handleSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setSubmitError(null);
			setTouched({ email: true, password: true });
			const errs = validate(values);
			if (Object.keys(errs).length > 0) return;
			if (isLoading === undefined) setInternalLoading(true);
			try {
				const payload = { email: values.email.trim(), password: values.password, remember: values.remember };
				if (onSubmit) {
					await onSubmit(payload);
				} else {
					const res = await axiosInstance.post("/auth/login", { email: payload.email, password: payload.password });
					if (typeof window !== "undefined" && res?.data?.token) {
						localStorage.setItem("token", res.data.token);
					}
					if (onSuccess) onSuccess(res.data);
				}
			} catch (e: unknown) {
				const message = e instanceof Error ? e.message : "Login failed";
				setSubmitError(message);
			} finally {
				if (isLoading === undefined) setInternalLoading(false);
			}
		},
		[isLoading, onSubmit, onSuccess, values]
	);

	return (
		<form onSubmit={handleSubmit} className={className} noValidate>
			<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<h2 style={{ margin: 0 }}>Login</h2>
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
						aria-describedby="login-email-error"
						style={{ padding: "10px 12px", border: "1px solid #ccc", borderRadius: 6 }}
					/>
					{touched.email && computedErrors.email ? (
						<span id="login-email-error" style={{ color: "#b00020", fontSize: 12 }}>
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
							autoComplete="current-password"
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="••••••••"
							aria-invalid={Boolean(touched.password && computedErrors.password)}
							aria-describedby="login-password-error"
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
						<span id="login-password-error" style={{ color: "#b00020", fontSize: 12 }}>
							{computedErrors.password}
						</span>
					) : null}
				</label>

				{showRemember || showForgotLink ? (
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						{showRemember ? (
							<label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
								<input
									type="checkbox"
									name="remember"
									checked={values.remember}
									onChange={handleChange}
								/>
								<span>Remember me</span>
							</label>
						) : <span />}
						{showForgotLink ? (
							<button
								type="button"
								onClick={onForgotPassword}
								style={{ background: "transparent", color: "#2563eb", border: "none", cursor: "pointer", padding: 0 }}
							>
								Forgot password?
							</button>
						) : null}
					</div>
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
					{loading ? "Signing in..." : "Sign in"}
				</button>
			</div>
		</form>
	);
}


