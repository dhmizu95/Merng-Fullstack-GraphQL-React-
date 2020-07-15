import React from 'react';
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react';
import momemt from 'moment';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
	const {
		id,
		username,
		body,
		createdAt,
		likeCount,
		commentCount,
		user: { avatar },
	} = post;

	const likePost = () => {
		console.log('like post');
	};

	const commentPost = () => {
		console.log('comment post');
	};

	return (
		<Card fluid>
			<Card.Content>
				<Image floated='right' size='mini' src={avatar} />
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/post/${id}`}>
					{momemt(createdAt).fromNow(true)}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button as='div' labelPosition='right' onClick={likePost}>
					<Button color='teal' basic>
						<Icon name='heart' />
					</Button>
					<Label basic color='teal' pointing='left'>
						{likeCount}
					</Label>
				</Button>
				<Button as='div' labelPosition='right' onClick={commentPost}>
					<Button color='blue' basic>
						<Icon name='comments' />
					</Button>
					<Label basic color='blue' pointing='left'>
						{commentCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
