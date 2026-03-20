import { NOT_NUMERIC_REGEX, ValidationMessages, ValidationMessageClassModificator } from "./form.const.js";
import { showElementMessage, hideElementMessage } from "./form.utils.js";
import { formValidate } from "./form.utils.js";
import { updateTotal } from "../total/total.js";

const { NUMERIC_ONLY, REQUIRED } = ValidationMessages;
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

const handleFormSubmit = (event) => {
	event.preventDefault();
	const { isValid, unvalidFields } = formValidate();

	if (isValid) {
		console.log("нужно Сделать отправку на сервер Очистить форму Показать оверлей об успешной отправке")
	} else {
		unvalidFields.forEach((field) => showElementMessage(REQUIRED, field, ERROR));
	}
};

const initForm = () => {
	quantityInputElement.addEventListener('input', handleQuantityInput);
	quantityInputElement.addEventListener('blur', handleQuantityBlur);

	formElement.addEventListener('input', handleRequiredFieldInput);

	formElement.addEventListener('change', updateTotal);
	formElement.addEventListener('submit', handleFormSubmit);
};

export { initForm };