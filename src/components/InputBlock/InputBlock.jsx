import React from 'react';
import styles from './InputBlock.module.css';

export const InputBlock = props => {
	return (
		<div className={styles.formInputBlock}>
			<label className={styles.formInputLabel} htmlFor={props.name}>
				{props.error}
			</label>
			<input
				className={styles.formInput}
				id={props.name}
				type={props.type}
				name={props.name}
				placeholder={props.placeholder}
				// pattern={props.pattern} // средствами html и RegEx
				{...props.regObj(props.name)}
			/>
		</div>
	);
};
