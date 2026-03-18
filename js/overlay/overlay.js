import { OverlayText } from "./overlay.const.js";

const overlayElement = document.querySelector('[data-js-overlay]');
const overlayTextElement = document.querySelector('[data-js-overlay-text]');

const showOverlay = (text) => {
	overlayElement.classList.remove('overlay--hidden');
	overlayTextElement.textContent = text;

	if (text === OverlayText.ORDER_SUCCESS) {
		overlayTextElement.style.color = 'var(--color-green-light)';
	}
};

const hideOverlay = () => {
	overlayElement.classList.add('overlay--hidden');
};

export { showOverlay, hideOverlay }