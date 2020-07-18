const Post = require('../../models/post.model');
const checkAuth = require('../../utilities/check.auth');
const { AuthenticationError } = require('apollo-server');

module.exports = {
	Query: {
		getPosts: async () => {
			try {
				const posts = await Post.find()
					.populate('user', ['avatar'])
					.sort({ createdAt: -1 });

				return posts;
			} catch (error) {
				throw new Error(error);
			}
		},
		getPost: async (_, { postId }) => {
			try {
				const post = await Post.findById(postId).populate('user', ['avatar']);
				if (post) {
					return post;
				} else {
					throw new Error('Post not found.');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createPost: async (_, { body }, context) => {
			const user = checkAuth(context);

			if (body.trim() === '') {
				throw new Error('Post body must not be empty');
			}

			const newPost = new Post({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString(),
			});

			const response = await newPost.save();
			const post = await Post.findById(response.id).populate('user', [
				'avatar',
			]);

			context.pubsub.publish('NEW_POST', {
				newPost: post,
			});

			return post;
		},
		deletePost: async (_, { postId }, context) => {
			const user = checkAuth(context);

			try {
				const post = await Post.findById(postId);
				if (post.username === user.username) {
					await post.delete();
					return 'Post deleted successfully.';
				} else {
					throw new AuthenticationError('Action not allowed.');
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		likePost: async (_, { postId }, context) => {
			const { username } = checkAuth(context);

			const post = await Post.findById(postId);

			if (post) {
				if (post.likes.find((like) => like.username === username)) {
					// Post alreaady liked, unlike it
					post.likes = post.likes.filter((like) => like.username !== username);
				} else {
					// Not liked, like it
					post.likes.push({
						username,
						createdAt: new Date().toISOString(),
					});
				}
				await post.save();

				return post;
			} else {
				throw new UserInputError('Post not found.');
			}
		},
	},
	Subscription: {
		newPost: {
			subscribe: async (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
		},
	},
};
