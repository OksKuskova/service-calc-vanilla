import { VALIDATION_MESSAGE_CLASS } from "./form.const.js";

const formElement = document.querySelector('[data-js-form]');

const showElementMessage = (message, element, extraClassName) => {
	const parent = element.parentElement;

	if (!parent) return;

	const oldMessage = parent.querySelector(`.${VALIDATION_MESSAGE_CLASS}`);

	oldMessage?.remove();

	const messageElement = document.createElement('span');
	messageElement.classList.add(VALIDATION_MESSAGE_CLASS, extraClassName);
	messageElement.textContent = message;

	parent.append(messageElement);
};

const hideElementMessage = (element) => {
	const parent = element.parentElement;

	if (!parent) return;

	const messageElement = parent.querySelector(`.${VALIDATION_MESSAGE_CLASS}`);

	messageElement?.remove();
}

const formValidate = () => {
	let isValid = true;
	const unvalidFields = [];

	const requiredFields = formElement.querySelectorAll('[required]');

	for (const input of requiredFields) {
		if (input.value.trim() === '') {
			isValid = false;
			unvalidFields.push(input);
		}
	}
	return { isValid, unvalidFields };
}

const getFormData = () => {
	const formData = new FormData(formElement);
	const data = Object.fromEntries(formData.entries());

	return {
		material: data.material,
		quantity: data.quantity,
		name: data.name.trim(),
	}
}

export { showElementMessage, hideElementMessage, formValidate, getFormData } 
