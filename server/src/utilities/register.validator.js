const validateRegister = (username, email, sex, password, confirmPassword) => {
	const errors = {};

	if (username.trim() === '') {
		errors.username = 'Username must not empty.';
	}
	if (sex.trim() === '') {
		errors.username = 'Sex must be selected.';
	}
	if (email.trim() === '') {
		errors.email = 'Email must not empty.';
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
			errors.email = 'Please inuclude a valid email.';
		}
	}
	if (password.trim() === '') {
		errors.password = 'Password must not empty.';
	} else if (password.length < 8) {
		errors.password = 'Password must be 8 character or more.';
	}

	if (password !== confirmPassword) {
		errors.confirmPassword = 'Password must match.';
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

module.exports = validateRegister;
