import React from 'react';
import styles from './Input.module.css';

export const Input = props => {
	return (
		<input
			className={styles.formInput}
			ref={props.inputRef}
			type={props.type}
			name={props.name}
			onChange={props.onChange}
			onBlur={props.onBlur}
			placeholder={props.placeholder}
			{...(props.pattern ? { pattern: props.pattern } : false)}
			value={props.value}
		/>
	);
};
