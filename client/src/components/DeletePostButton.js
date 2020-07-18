import React, { useState } from 'react';
import { Icon, Button, Confirm } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utilities/query';

const DeletePostButton = ({ postId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deletePost] = useMutation(DELETE_POST_MUTATION, {
		update() {
			setConfirmOpen(false);
			if (callback) callback();
		},
		variables: { postId },
		refetchQueries: [{ query: FETCH_POSTS_QUERY }],
	});

	return (
		<>
			<Button
				as='div'
				color='red'
				floated='right'
				onClick={() => setConfirmOpen(true)}
			>
				<Icon name='trash' style={{ margin: 0 }} />
			</Button>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deletePost}
			/>
		</>
	);
};

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

export default DeletePostButton;
