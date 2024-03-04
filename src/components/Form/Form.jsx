import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputBlock } from '../InputBlock/InputBlock';
import { formSchema } from '../../validationSchema';
import styles from './Form.module.css';

export const Form = ({ action }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(formSchema),
	});

	const onSubmit = formData => {
		action(formData);
		reset();
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<button
				className={styles.clearButton}
				type="button"
				onClick={() => reset()}
			></button>
			<h1 className={styles.formCaption}>Регистрация</h1>
			<div className={styles.inputContainer}>
				<InputBlock
					type={'email'}
					name={'email'}
					placeholder={'Email'}
					// pattern={'[\\w.\\-]+@[\\w\\-]+\\.\\w+'} // средствами html и RegEx
					regObj={register}
					error={errors.email?.message}
				/>
				<InputBlock
					type={'password'}
					name={'password'}
					placeholder={'Пароль'}
					// pattern={'\\w{8,}'} // средствами html и RegEx
					regObj={register}
					error={errors.password?.message}
				/>
				<InputBlock
					type={'password'}
					name={'confirmPassword'}
					placeholder={'Пароль ещё раз'}
					// pattern={'\\w{8,}'} // средствами html и RegEx
					regObj={register}
					error={errors.confirmPassword?.message}
				/>
			</div>
			<button
				className={styles.submitButton}
				type={'submit'}
				disabled={!!Object.keys(errors).length}
			>
				Зарегистрироваться
			</button>
		</form>
	);
};
