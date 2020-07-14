const validateLogin = (username, password) => {
	const errors = {};

	if (username.trim() === '') {
		errors.username = 'Username must not empty.';
	}
	if (password.trim() === '') {
		errors.password = 'Password must not empty.';
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

module.exports = validateLogin;
