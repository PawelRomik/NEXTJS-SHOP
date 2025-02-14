"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { EmailAddressResource } from "@clerk/types";

const ChangeEmailForm = () => {
	const { isLoaded, user } = useUser();
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);
	const [emailObj, setEmailObj] = useState<EmailAddressResource | undefined>(undefined);
	const [passwordCurrent, setPasswordCurrent] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	if (!isLoaded || !user?.id) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		try {
			const response = await fetch("/api/clerk/verifypassword", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ userId: user.id, password: passwordCurrent })
			});

			const isVerified = await response.json();

			if (isVerified.verified) {
				const res = await user.createEmailAddress({ email });
				await user.reload();

				const emailAddress = user.emailAddresses.find((a) => a.id === res.id);
				setEmailObj(emailAddress as EmailAddressResource | undefined);

				emailAddress?.prepareVerification({ strategy: "email_code" });
				setIsVerifying(true);
			} else {
				setErrorMessage("Incorrect password. Please try again.");
			}
		} catch (err: any) {
			if (err.errors[0].code == "form_identifier_exists") {
				setErrorMessage("This Email is taken.");
			} else setErrorMessage("An error occurred while verifying your password.");
		}
		setTimeout(() => {
			setErrorMessage(null);
			setSuccessMessage(null);
		}, 3000);
	};

	const verifyCode = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		try {
			const emailVerifyAttempt = await emailObj?.attemptVerification({ code });

			if (emailVerifyAttempt?.verification.status === "verified") {
				await updateOldEmail();
			} else {
				setErrorMessage("Invalid verification code. Please try again.");
			}
		} catch (err) {
			setErrorMessage("An error occurred while verifying your email.");
			console.error(JSON.stringify(err, null, 2));
		}
		setTimeout(() => {
			setErrorMessage(null);
			setSuccessMessage(null);
		}, 3000);
	};

	const updateOldEmail = async () => {
		try {
			const response = await fetch("/api/clerk/email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ userId: user?.id })
			});

			await response.json();
			setSuccessMessage("Email successfully changed!");
		} catch (err) {
			setErrorMessage("An error occurred while updating your email.");
			console.log(err);
		}
		setTimeout(() => {
			setErrorMessage(null);
			setSuccessMessage(null);
			setIsVerifying(false);
		}, 3000);
	};

	if (isVerifying) {
		return (
			<div className="flex flex-col items-center gap-4 text-white">
				<h1 className="w-full text-center text-3xl font-bold uppercase">Verify Email</h1>
				{errorMessage && <p className="text-red-500">{errorMessage}</p>}
				{successMessage && <p className="text-green-500">{successMessage}</p>}
				<form onSubmit={(e) => verifyCode(e)} className="flex flex-col gap-4">
					<div className="flex items-center justify-between gap-5">
						<label htmlFor="code">Enter Code</label>
						<input
							id="code"
							name="code"
							type="text"
							value={code}
							onChange={(e) => setCode(e.target.value)}
							className="rounded p-2 text-black"
						/>
					</div>
					<button type="submit" className="rounded bg-red-600 px-4 py-2 text-white">
						Verify
					</button>
				</form>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center gap-4 text-white">
			<h1 className="w-full text-center text-3xl font-bold uppercase">Change Email</h1>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			{successMessage && <p className="text-green-500">{successMessage}</p>}
			<form autoComplete="off" onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
				<div className="flex items-center justify-between gap-5">
					<label htmlFor="email">Enter Email Address</label>
					<input
						id="email"
						name="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="rounded p-2 text-black"
					/>
				</div>
				<div className="flex items-center justify-between gap-5">
					<label htmlFor="passwordCurrent">Enter Current Password</label>
					<input
						id="passwordCurrent"
						name="passwordCurrent"
						type="password"
						value={passwordCurrent}
						onChange={(e) => setPasswordCurrent(e.target.value)}
						className="rounded p-2 text-black"
					/>
				</div>
				<button type="submit" className="rounded bg-red-600 px-4 py-2 text-white">
					Change Email
				</button>
			</form>
		</div>
	);
};

export default ChangeEmailForm;
