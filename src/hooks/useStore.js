import { useState } from 'react';

const initialState = {
	email: '',
	password: '',
};

export const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		store: state,
		updateStore: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		resetStore: () => {
			setState(initialState);
		},
	};
};
