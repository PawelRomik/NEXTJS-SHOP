"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { EmailAddressResource } from "@clerk/types";

const ChangeEmailForm = () => {
	const { isLoaded, user } = useUser();
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);
	const [successful, setSuccessful] = useState(false);
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
		} catch (err) {
			setErrorMessage("An error occurred while verifying your password.");
			console.error(JSON.stringify(err, null, 2));
		}
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
			setSuccessful(true);
			setSuccessMessage("Email successfully changed!");
		} catch (err) {
			setErrorMessage("An error occurred while updating your email.");
			console.log(err);
		}
	};

	if (successful) {
		return (
			<>
				<h1>Email added!</h1>
				{successMessage && <p className="text-green-500">{successMessage}</p>}
			</>
		);
	}

	if (isVerifying) {
		return (
			<>
				<h1>Verify email</h1>
				{errorMessage && <p className="text-red-500">{errorMessage}</p>}
				<div>
					<form onSubmit={(e) => verifyCode(e)}>
						<div>
							<label htmlFor="code">Enter code</label>
							<input
								onChange={(e) => setCode(e.target.value)}
								id="code"
								name="code"
								type="text"
								value={code}
							/>
						</div>
						<div>
							<button type="submit">Verify</button>
						</div>
					</form>
				</div>
			</>
		);
	}

	return (
		<div className="text-white">
			<h1>Change Email</h1>
			<div>
				{errorMessage && <p className="text-red-500">{errorMessage}</p>}
				{successMessage && <p className="text-green-500">{successMessage}</p>}
				<form autoComplete="false" onSubmit={(e) => handleSubmit(e)}>
					<div>
						<label htmlFor="email">Enter email address</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							id="email"
							name="email"
							type="email"
							value={email}
						/>
					</div>
					<div>
						<label htmlFor="passwordCurrent">Enter current password</label>
						<input
							onChange={(e) => setPasswordCurrent(e.target.value)}
							id="passwordCurrent"
							name="passwordCurrent"
							type="password"
							value={passwordCurrent}
						/>
					</div>
					<div>
						<button type="submit">Change</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChangeEmailForm;
