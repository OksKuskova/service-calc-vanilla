import { NOT_NUMERIC_REGEX, ValidationMessages, ValidationMessageClassModificator } from "./form.const.js";
import { showElementMessage, hideElementMessage, getFormData } from "./form.utils.js";
import { formValidate } from "./form.utils.js";
import { updateTotal } from "../total/total.js";
import { sendData } from "../api/api.js";
import { showOverlay, hideOverlay } from "../overlay/overlay.js";
import { OverlayText, OVERLAY_DURATION } from "../overlay/overlay.const.js";
import { stopTimer } from "../timer/timer.js";

const { NUMERIC_ONLY, REQUIRED, SERVER_ERROR } = ValidationMessages;
const { HINT, ERROR } = ValidationMessageClassModificator;

const formElement = document.querySelector('[data-js-form]');
const quantityInputElement = formElement.querySelector('#quantity');
const formSubmitElement = document.querySelector('[data-js-form-submit]');

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

async function handleFormSubmit(event) {
	event.preventDefault();
	const { isValid, unvalidFields } = formValidate();

	if (isValid) {
		try {
			formSubmitElement.disabled = true;
			formSubmitElement.textContent = 'Отправка формы...';

			const data = getFormData();
			const responce = await sendData(data);

			if (!responce.ok) {
				throw new Error(`${responce.error}`);
			}

			showOverlay(OverlayText.ORDER_SUCCESS);
			setTimeout(hideOverlay, OVERLAY_DURATION);

			formElement.reset();
			hideElementMessage(formSubmitElement);
			stopTimer();
		}
		catch (error) {
			console.error(error.message);
			showElementMessage(SERVER_ERROR, formSubmitElement, ERROR);
		}
		finally {
			formSubmitElement.disabled = false;
			formSubmitElement.textContent = 'Оформить заказ';
		}
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