import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';
import { LIKE_POST_MUTATION } from '../utilities/mutations';

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
	const [liked, setLiked] = useState(false);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
	});

	useEffect(() => {
		if (user && likes.find((like) => user.username === like.username)) {
			setLiked(true);
		} else setLiked(false);
	}, [user, likes]);

	const likeButton = user ? (
		liked ? (
			<Button color='teal'>
				<Icon name='heart' />
			</Button>
		) : (
			<Button color='teal' basic>
				<Icon name='heart' />
			</Button>
		)
	) : (
		<Button as={Link} to='/login' color='teal' basic>
			<Icon name='heart' />
		</Button>
	);

	return (
		<Button as='div' labelPosition='right' onClick={likePost}>
			<Popup content={liked ? 'Unlike' : 'Like'} trigger={likeButton} />
			<Label basic color='teal' pointing='left'>
				{likeCount}
			</Label>
		</Button>
	);
};

export default LikeButton;
