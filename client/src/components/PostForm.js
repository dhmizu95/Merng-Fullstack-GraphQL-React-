import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from './../utilities/hooks';
import { gql, useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utilities/query';

const PostForm = () => {
	const [errors, setErrors] = useState('');

	const createPostCallback = () => {
		createPost();
	};

	const { onChange, onSubmit, values } = useForm(createPostCallback, {
		body: '',
	});

	const [createPost] = useMutation(CREATE_POST_MUTATION, {
		update(proxy, result) {
			values.body = '';
			setErrors('');
		},
		onError(error) {
			setErrors(error.graphQLErrors[0].message);
		},
		variables: values,
		refetchQueries: [{ query: FETCH_POSTS_QUERY }],
	});

	return (
		<div>
			<Form noValidate onSubmit={onSubmit}>
				<h2>Create a post:</h2>
				<Form.Field>
					<Form.Input
						placeholder='Hi world'
						name='body'
						type='text'
						error={errors ? true : false}
						value={values.body}
						onChange={onChange}
					/>
					<Button type='submit' primary>
						Submit
					</Button>
				</Form.Field>
			</Form>
			{errors && (
				<div className='ui error message' style={{ marginBottom: 20 }}>
					<ul className='list'>
						<li>{errors}</li>
					</ul>
				</div>
			)}
		</div>
	);
};

const CREATE_POST_MUTATION = gql`
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

export default PostForm;
