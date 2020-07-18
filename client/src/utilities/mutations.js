import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
	mutation register(
		$username: String!
		$email: String!
		$sex: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				sex: $sex
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			username
			sex
			token
			avatar
			createdAt
		}
	}
`;

export const LOGIN_USER_MUTATION = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			username
			sex
			token
			avatar
			createdAt
		}
	}
`;

export const CREATE_POST_MUTATION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			username
			body
			createdAt
			likeCount
			commentCount
			likes {
				username
			}
			comments {
				id
				username
				body
				createdAt
			}
			user {
				avatar
			}
		}
	}
`;

export const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

export const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
			comments {
				id
				username
				createdAt
				body
			}
			commentCount
		}
	}
`;

export const CREATE_COMMENT_MUTATION = gql`
	mutation createComment($postId: ID!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				username
				createdAt
				body
			}
			commentCount
		}
	}
`;

export const LIKE_POST_MUTATION = gql`
	mutation likesPost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;
