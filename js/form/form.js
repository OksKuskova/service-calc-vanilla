import { NOT_NUMERIC_REGEX, ValidationMessages, ValidationMessageClassModificator } from "./form.const.js";
import { showElementMessage, hideElementMessage } from "./form.utils.js";

const { NUMERIC_ONLY } = ValidationMessages;
const { HINT, ERROR } = ValidationMessageClassModificator;

const formElement = document.querySelector('[data-js-form]');
const quantityInputElement = formElement.querySelector('#quantity');

const handleQuantityInput = (event) => {
	const input = event.currentTarget;

	const originValue = input.value;
	const cleanedValue = originValue.replace(NOT_NUMERIC_REGEX, '');

	input.value = cleanedValue;

	if (originValue !== cleanedValue) {
		showElementMessage(NUMERIC_ONLY, input, HINT);
	}
};

const handleQuantityBlur = (event) => {
	const element = event.currentTarget;

	if (element.parentElement?.querySelector(`.${ERROR}`)) return;

	hideElementMessage(event.currentTarget);
};

const handleRequiredFieldInput = (event) => {
	const element = event.target;

	if (!element.closest('[data-js-form]') || !element.hasAttribute('required') || element.parentElement?.querySelector(`.${HINT}`)) return;

	hideElementMessage(element);
}

const initForm = () => {
	quantityInputElement.addEventListener('input', handleQuantityInput);
	quantityInputElement.addEventListener('blur', handleQuantityBlur);

	formElement.addEventListener('input', handleRequiredFieldInput);
	formElement.addEventListener('submit', handleFormSubmit);
};

export { initForm };