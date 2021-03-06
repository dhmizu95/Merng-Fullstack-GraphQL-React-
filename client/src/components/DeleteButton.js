import React, { useState } from 'react';
import { Icon, Button, Confirm, Popup } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utilities/queries';
import {
	DELETE_POST_MUTATION,
	DELETE_COMMENT_MUTATION,
} from '../utilities/mutations';

const DeleteButton = ({ postId, commentId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

	const [deletePostOrComment] = useMutation(mutation, {
		update() {
			setConfirmOpen(false);
			if (callback) callback();
		},
		variables: { postId, commentId },
		refetchQueries: [{ query: FETCH_POSTS_QUERY }],
	});

	return (
		<>
			<Popup
				content={commentId ? 'Delete comment' : 'Delete post'}
				inverted
				trigger={
					<Button
						as='div'
						color='red'
						floated='right'
						onClick={() => setConfirmOpen(true)}
					>
						<Icon name='trash' style={{ margin: 0 }} />
					</Button>
				}
			/>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deletePostOrComment}
			/>
		</>
	);
};

export default DeleteButton;
