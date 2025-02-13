"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

function ChangeNameForm() {
	const { isLoaded, user } = useUser();
	const [username, setUsername] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	if (!isLoaded || !user?.id) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		if (username.length < 4) {
			setErrorMessage("Username must be at least 4 characters long!");
			return;
		}

		try {
			await user.update({ username });
			await user.reload();
			setSuccessMessage("Username successfully changed!");
		} catch (err) {
			setErrorMessage("An error occurred while changing your username.");
		}
	};

	return (
		<div className="text-white">
			<h1>Change Username</h1>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			{successMessage && <p className="text-green-500">{successMessage}</p>}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">New Username</label>
					<input
						onChange={(e) => setUsername(e.target.value)}
						id="username"
						type="text"
						value={username}
					/>
				</div>
				<div>
					<button type="submit">Change</button>
				</div>
			</form>
		</div>
	);
}

export default ChangeNameForm;
