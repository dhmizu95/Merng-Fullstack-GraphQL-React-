const postResolvers = require('./post.resolve');
const userResolvers = require('./user.resolve');
const commentResolvers = require('./comment.resolve');

module.exports = {
	Post: {
		likeCount: (parent) => parent.likes.length,
		commentCount: (parent) => parent.comments.length,
	},
	Query: {
		...postResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
		...postResolvers.Mutation,
		...commentResolvers.Mutation,
	},
	Subscription: {
		...postResolvers.Subscription,
	},
};
