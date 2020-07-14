const { Schema, model } = require('mongoose');

const postSchema = new Schema({
	username: String,
	body: String,
	createdAt: String,
	comments: [{ body: String, username: String, createdAt: String }],
	likes: [{ username: String, createdAt: String }],
	user: {
		type: Schema.Types.ObjectId,
		refs: 'users',
	},
});

module.exports = model('Post', postSchema);
