import * as yup from 'yup';

export const formSchema = yup
	.object()
	.shape({
		email: yup
			.string()
			// .email() - недостаточно точен
			.matches(/^[\w.-]+@[\w-]+\.\w+$/, 'Некорректный email.')
			.required('Обязательно к заполнению'),
		password: yup
			.string()
			.matches(
				/^\w+$/,
				'Некорректный пароль. Разрешены латинские символы, цифры, нижнее подчёркивание.',
			)
			.min(8, 'Некорректный пароль. Длина пароля должна быть не менее 8 символов.')
			.required('Обязательно к заполнению'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
	})
	.required('Необходимо заполнить все поля');
