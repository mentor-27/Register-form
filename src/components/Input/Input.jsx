import React from 'react';
import styles from './Input.module.css';

export const Input = props => {
	return (
		<input
			className={styles.formInput}
			type={props.type}
			name={props.name}
			placeholder={props.placeholder}
			pattern={props.pattern}
			{...props.regObj}
			onBlur={props.onBlur}
		/>
	);
};
