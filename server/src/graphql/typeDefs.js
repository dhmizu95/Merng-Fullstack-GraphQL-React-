const { gql } = require('apollo-server');

const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		email: String!
		token: String!
		createdAt: String!
		sex: String!
		avatar: String!
	}
	type Post {
		id: ID!
		username: String!
		body: String!
		createdAt: String!
		likes: [Like]!
		comments: [Comment]!
		likeCount: Int!
		commentCount: Int!
		user: User!
	}
	type Comment {
		id: ID!
		body: String!
		username: String!
		createdAt: String!
	}
	type Like {
		id: ID!
		username: String!
		createdAt: String!
	}
	input RegisterInput {
		username: String!
		email: String!
		password: String!
		confirmPassword: String!
		sex: String!
	}
	type Query {
		getPosts: [Post]
		getPost(postId: ID!): Post
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): String!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
		likePost(postId: ID!): Post!
	}
	type Subscription {
		newPost: Post!
	}
`;

module.exports = typeDefs;
