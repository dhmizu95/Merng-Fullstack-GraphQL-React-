import React, { useContext } from 'react';
import { Button, Card, Image, Icon, Label, Popup } from 'semantic-ui-react';
import momemt from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const PostCard = ({ post }) => {
	const {
		id,
		username,
		body,
		createdAt,
		likeCount,
		likes,
		commentCount,
		user: { avatar },
	} = post;

	const { user } = useContext(AuthContext);

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
				<LikeButton post={{ id, likes, likeCount }} user={user} />

				<Popup
					content='Comment on post'
					inverted
					trigger={
						<Button labelPosition='right' as={Link} to={`/post/${id}`}>
							<Button color='blue' basic>
								<Icon name='comments' />
							</Button>
							<Label basic color='blue' pointing='left'>
								{commentCount}
							</Label>
						</Button>
					}
				/>

				{user && user.username === username && <DeleteButton postId={id} />}
			</Card.Content>
		</Card>
	);
};

export default PostCard;
