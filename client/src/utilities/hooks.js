import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const dropChange = (e, { value }) => {
		setValues({ ...values, sex: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		callback();
	};

	return {
		onChange,
		dropChange,
		onSubmit,
		values,
	};
};
