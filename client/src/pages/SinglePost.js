import React, { useContext, useState, useRef } from 'react';
import {
	Grid,
	Image,
	Card,
	Label,
	Icon,
	Button,
	Form,
} from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/client';
import momemt from 'moment';
import LikeButton from './../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import {
	FETCH_POST_QUERY,
	CREATE_COMMENT_MUTATION,
} from '../utilities/queries';

const SinglePost = (props) => {
	const postId = props.match.params.postId;
	const [comment, setComment] = useState('');
	const commentInputRef = useRef(null);
	const { user } = useContext(AuthContext);

	const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
		variables: { postId },
	});

	const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
		update() {
			setComment('');
			commentInputRef.current.blur();
		},
		variables: {
			postId,
			body: comment,
		},
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
									<DeleteButton postId={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									<p>Post a comment</p>
									<Form>
										<div className='ui action input fluid'>
											<input
												type='text'
												placeholder='comment'
												name='comment'
												value={comment}
												onChange={(e) => setComment(e.target.value)}
												ref={commentInputRef}
											/>
											<button
												type='submit'
												className='ui button teal'
												disabled={comment.trim() === ''}
												onClick={createComment}
											>
												Submit
											</button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map((comment) => (
							<Card fluid key={comment.id}>
								<Card.Content>
									{user && user.username === comment.username && (
										<DeleteButton postId={id} commentId={comment.id} />
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>
										{momemt(comment.createdAt).fromNow(true)}
									</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return postMarkup;
};

export default SinglePost;
