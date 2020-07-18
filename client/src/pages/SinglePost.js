import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid, Image, Card, Label, Icon, Button } from 'semantic-ui-react';
import momemt from 'moment';
import LikeButton from './../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeletePostButton from '../components/DeletePostButton';

const SinglePost = (props) => {
	const postId = props.match.params.postId;

	const { user } = useContext(AuthContext);

	const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
		variables: { postId },
	});

	const deletePostCallback = () => {
		props.history.push('/');
	};

	let postMarkup;

	if (!getPost) {
		postMarkup = <p>Loading Post.....</p>;
	} else {
		const {
			id,
			username,
			body,
			likeCount,
			likes,
			comments,
			commentCount,
			user: { avatar },
			createdAt,
		} = getPost;

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image src={avatar} size='small' float='right' />
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{momemt(createdAt).fromNow(true)}</Card.Meta>
								<Card.Description>{body}</Card.Description>
								<hr />
							</Card.Content>
							<Card.Content extra>
								<LikeButton post={{ id, likes, likeCount }} user={user} />
								<Button
									as='div'
									labelPosition='right'
									onClick={() => console.log('Button clicked')}
								>
									<Button basic color='blue'>
										<Icon name='comments' />
									</Button>
									<Label basic color='blue' pointing='left'>
										{commentCount}
									</Label>
								</Button>
								{user && user.username === username && (
									<DeletePostButton postId={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return postMarkup;
};

const FETCH_POST_QUERY = gql`
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

export default SinglePost;
