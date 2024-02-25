import { useStore } from '../src/hooks/useStore';
import { Input } from './components/Input/Input';
import { useState, useRef } from 'react';
import styles from './App.module.css';

const sendFormData = formData => {
	console.log(formData);
};

export const App = () => {
	const { store, updateStore, resetStore } = useStore();
	const [inputErrors, setInputError] = useState([]);
	const emailInput = useRef(null);
	const passwordInput = useRef(null);
	const passAgainInput = useRef(null);
	const submitButton = useRef(null);

	const resetForm = () => {
		resetStore();
		passAgainInput.current.value = '';
	};

	const onSubmit = e => {
		e.preventDefault();
		if (
			!inputErrors.length &&
			emailInput.current.value !== '' &&
			passwordInput.current.value !== '' &&
			passAgainInput.current.value !== ''
		) {
			sendFormData(store);
			resetForm();
		}
	};

	const onChange = e => {
		updateStore(e.target.name, e.target.value);
		if (
			e.target.name === 'passAgain' &&
			passAgainInput.current.value === store.password
		) {
			submitButton.current.focus();
		}
	};

	const onBlur = () => {
		let errors = [];

		if (
			emailInput.current.value !== '' &&
			!/^[\w-]+@{1}[\w-]+\.[\w]+$/.test(emailInput.current.value)
		) {
			errors.push('Некорректный email.');
		}
		if (
			passwordInput.current.value !== '' &&
			!/^[\w]{8,}$/.test(passwordInput.current.value)
		) {
			errors.push(
				'Некорректный пароль. Разрешены латинские символы, цифры, нижнее подчёркивание. Длина пароля должна быть не менее 8 символов',
			);
		}
		if (passAgainInput.current.value !== store.password) {
			errors.push('Пароли не совпадают');
		}

		setInputError(errors);
	};

	return (
		<form className={styles.app} onSubmit={onSubmit}>
			<button className={styles.clearButton} type="button" onClick={resetForm}></button>
			<h1 className={styles.formCaption}>Регистрация</h1>
			<div className={styles.inputContainer}>
				<ul className={styles.errorLabel}>
					{inputErrors.map((error, i) => (
						<li key={i}>{error}</li>
					))}
				</ul>
				<Input
					inputRef={emailInput}
					type={'email'}
					name={'email'}
					value={store.email}
					placeholder={'Email'}
					onChange={onChange}
					onBlur={onBlur}
				/>
				<Input
					inputRef={passwordInput}
					type={'password'}
					name={'password'}
					value={store.password}
					placeholder={'Пароль'}
					pattern={'[a-zA-Z0-9]+'}
					onChange={onChange}
					onBlur={onBlur}
				/>
				<Input
					inputRef={passAgainInput}
					type={'password'}
					name={'passAgain'}
					placeholder={'Пароль ещё раз'}
					pattern={'[a-zA-Z0-9]+'}
					onChange={onChange}
					onBlur={onBlur}
				/>
			</div>
			<button className={styles.submitButton} ref={submitButton} type={'submit'}>
				Зарегистрироваться
			</button>
		</form>
	);
};
