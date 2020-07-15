const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/user.model');
const validateRegister = require('../../utilities/register.validator');
const validateLogin = require('../../utilities/login.validator');

const generateToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		SECRET_KEY,
		{ expiresIn: 3600 }
	);
};

module.exports = {
	Mutation: {
		login: async (_, { username, password }) => {
			const { errors, valid } = validateLogin(username, password);

			if (!valid) {
				throw new UserInputError('Error: ', { errors });
			}

			const user = await User.findOne({ username });

			if (!user) {
				errors.general = 'User not found.';
				throw new UserInputError('Wrong credentials.', { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = 'Wrong credentials.';
				throw new UserInputError('Wrong credentials.', { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
		register: async (
			_,
			{ registerInput: { username, email, password, confirmPassword, sex } }
		) => {
			// validate user data
			const { errors, valid } = validateRegister(
				username,
				email,
				sex,
				password,
				confirmPassword
			);

			if (!valid) {
				throw new UserInputError('Error: ', { errors });
			}

			// make sure user doesnt already exist
			const user = await User.findOne({ username });
			if (user) {
				errors.username = 'Username is taken.';
				throw new UserInputError('Username is taken.', { errors });
			}

			// hash the password and create auth token
			password = await bcrypt.hash(password, 12);
			const newUser = new User({
				username,
				password,
				email,
				sex,
				createdAt: new Date().toISOString(),
			});

			if (newUser.sex === 'male') {
				newUser.avatar =
					'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
			} else if (newUser.sex === 'female') {
				newUser.avatar =
					'https://react.semantic-ui.com/images/avatar/large/molly.png';
			}
			const response = await newUser.save();

			const token = generateToken(response);

			return {
				...response._doc,
				id: response._id,
				token,
			};
		},
	},
};
