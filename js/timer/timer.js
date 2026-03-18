import { START_TIMER_VALUE, START_DISCOUNT_VALUE } from "./timer.const.js";

const timerElement = document.querySelector('[data-js-timer]');
const discountElement = document.querySelector('[data-js-discount]');

let timer = START_TIMER_VALUE;
let discount = START_DISCOUNT_VALUE;
let intervalId = null;

const stopTimer = () => {
	clearInterval(intervalId);
	intervalId = null;

	discount = 0;
	discountElement.textContent = discount;
}

const initDiscountTimer = () => {
	timerElement.textContent = timer;
	discountElement.textContent = discount;
	console.log('intervalId:', intervalId);

	intervalId = setInterval(() => {
		--timer;
		timerElement.textContent = timer;

		if (timer <= 0) {
			stopTimer();
			console.log('intervalId:', intervalId);
		}
	}, 1000);
}

export { initDiscountTimer }