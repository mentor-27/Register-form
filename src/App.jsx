import { Form } from './components/Form/Form';

const sendFormData = formData => {
	console.log(formData);
};

export const App = () => {
	return <Form action={sendFormData} />;
};
