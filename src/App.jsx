import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useStore } from '../src/hooks/useStore';
import { Input } from './components/Input/Input';
import { useState, useRef } from 'react';
import styles from './App.module.css';

const sendFormData = formData => {
	console.log(formData);
};

const formSchema = yup.object({
	email: yup.string().matches(/^[\w\.-]+@{1}\w+\.\w+$/, 'Некорректный email.'),
	password: yup
		.string()
		.matches(
			/^\w+$/,
			'Некорректный пароль. Разрешены латинские символы, цифры, нижнее подчёркивание.',
		)
		.min(8, 'Некорректный пароль. Длина пароля должна быть не менее 8 символов.'),
});

export const App = () => {
	const [inputErrors, setInputError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		mode: 'all',
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(formSchema),
	});

	const onBlur = () => {
		const newArr = [];
		Object.keys(errors).forEach(key => {
			newArr.push(errors[key]?.message);
			setInputError(newArr);
		});
	};

	const onSubmit = formData => {
		if (formData.password === formData.passAgain) {
			sendFormData(formData);
		}
	};

	return (
		<form className={styles.app} onSubmit={handleSubmit(onSubmit)}>
			<button
				className={styles.clearButton}
				type="button"
				onClick={() => reset()}
			></button>
			<h1 className={styles.formCaption}>Регистрация</h1>
			<div className={styles.inputContainer}>
				<ul className={styles.errorLabel}>
					{inputErrors && inputErrors.map((error, i) => <li key={i}>{error}</li>)}
				</ul>
				<Input
					type={'email'}
					name={'email'}
					placeholder={'Email'}
					regObj={register('email')}
					onBlur={onBlur}
					// pattern={'^[\\w-]+@{1}[\\w]+\\.\\w+$'}
				/>
				<Input
					type={'password'}
					name={'password'}
					placeholder={'Пароль'}
					regObj={register('password')}
					onBlur={onBlur}
					// pattern={'\\w{8,}'}
				/>
				<Input
					type={'password'}
					name={'passAgain'}
					placeholder={'Пароль ещё раз'}
					regObj={register('passAgain')}
					onBlur={onBlur}
					// pattern={'\\w{8,}'}
				/>
			</div>
			<button className={styles.submitButton} type={'submit'}>
				Зарегистрироваться
			</button>
		</form>
	);
};
