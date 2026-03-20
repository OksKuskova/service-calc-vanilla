import { VALIDATION_MESSAGE_CLASS } from "./form.const.js";

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

export { showElementMessage, hideElementMessage } 
