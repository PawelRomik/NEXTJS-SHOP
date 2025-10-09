export const ERROR_MESSAGES: Record<string, keyof IntlMessages["auth"]> = {
	"Identifier is invalid.": "invalidIdentifier",
	"Couldn't find your account.": "noAccountFound",
	"Password is incorrect. Try again, or use another method.": "invalidPassword",
	"That email address is taken. Please try another.": "emailTaken",
	"email_address must be a valid email address.": "invalidEmail",
	"Passwords must be 8 characters or more.": "shortPassword",
	"Password has been found in an online data breach. For account safety, please use a different password.":
		"strongerPassword",
	"Incorrect code": "incorrectCode",
	"That username is taken. Please try another.": "usernameTaken",
	"Username must be between 4 and 64 characters long.": "wrongUsername",
	"Field is empty.": "emptyField"
};

export const createGetErrorMessage = (t: any) => {
	return (message: string) => {
		const key = ERROR_MESSAGES[message] ?? "unexpectedError";
		return t(key);
	};
};
