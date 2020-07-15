import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from './../utilities/hooks';

const Register = (props) => {
	const [errors, setErrors] = useState('');

	const registerUserCallback = () => {
		registerUser();
	};

	const { onChange, onSubmit, dropChange, values } = useForm(
		registerUserCallback,
		{
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			sex: '',
		}
	);

	const [registerUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, result) {
			props.history.push('/');
		},
		onError(error) {
			setErrors(error.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	const sexOptions = [
		{ key: 'male', value: 'male', text: 'Male' },
		{ key: 'female', value: 'female', text: 'Female' },
	];

	return (
		<div className='form-container'>
			<Form noValidate onSubmit={onSubmit} className={loading ? 'loading' : ''}>
				<Form.Input
					label='Username'
					placeholder='Username'
					name='username'
					type='text'
					error={errors.username ? true : false}
					value={values.username}
					onChange={onChange}
				/>
				<Form.Input
					label='Email'
					placeholder='Email'
					name='email'
					type='text'
					error={errors.email ? true : false}
					value={values.email}
					onChange={onChange}
				/>
				<div className='field'>
					<label>Sex</label>
					<Dropdown
						placeholder='Select your sex'
						fluid
						selection
						search
						options={sexOptions}
						onChange={dropChange}
					/>
				</div>

				<Form.Input
					label='Password'
					placeholder='Password'
					name='password'
					type='password'
					error={errors.password ? true : false}
					value={values.password}
					onChange={onChange}
				/>
				<Form.Input
					label='Confirm Password'
					placeholder='Confirm Password'
					name='confirmPassword'
					type='password'
					error={errors.confirmPassword ? true : false}
					value={values.confirmPassword}
					onChange={onChange}
				/>
				<Button type='submit' primary>
					Register
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

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$sex: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				sex: $sex
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			username
			sex
			token
			avatar
			createdAt
		}
	}
`;

export default Register;
