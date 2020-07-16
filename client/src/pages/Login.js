import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from './../utilities/hooks';
import { AuthContext } from '../context/auth';

const Login = (props) => {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState('');

	const loginUserCallback = () => {
		loginUser();
	};

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		username: '',
		password: '',
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			context.login(userData);
			props.history.push('/');
		},
		onError(error) {
			setErrors(error.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	return (
		<div className='form-container'>
			<Form noValidate onSubmit={onSubmit} className={loading ? 'loading' : ''}>
				<Form.Input
					label='Username'
					placeholder='Username'
					name='username'
					type='text'
					value={values.username}
					error={errors.username ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label='Password'
					placeholder='Password'
					name='password'
					type='password'
					value={values.password}
					error={errors.password ? true : false}
					onChange={onChange}
				/>
				<Button type='submit' primary>
					Login
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className='ui error message'>
					<ul className='list'>
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const LOGIN_USER = gql`
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

export default Login;
