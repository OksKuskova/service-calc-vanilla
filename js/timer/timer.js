import { updateTotal } from "../total/total.js";
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
	timerElement.textContent = 0;
	updateTotal();
}

const initDiscountTimer = () => {
	timerElement.textContent = timer;
	discountElement.textContent = discount;

	intervalId = setInterval(() => {
		--timer;
		timerElement.textContent = timer;

		if (timer <= 0) {
			stopTimer();
		}
	}, 1000);
}

export { initDiscountTimer, stopTimer }