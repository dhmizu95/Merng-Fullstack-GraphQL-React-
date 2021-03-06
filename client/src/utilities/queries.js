import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
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

export const FETCH_POST_QUERY = gql`
	query($postId: ID!) {
		getPost(postId: $postId) {
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
