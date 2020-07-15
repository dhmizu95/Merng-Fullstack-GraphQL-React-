const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	createdAt: String,
	sex: String,
	avatar: String,
});

module.exports = model('User', userSchema);
