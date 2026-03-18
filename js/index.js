import { getData } from "./api/api.js";
import { OverlayText } from "./overlay/overlay.const.js";
import { hideOverlay, showOverlay } from "./overlay/overlay.js";
import { renderSelect } from "./select.js";
import { initDiscountTimer } from "./timer/timer.js";

showOverlay(OverlayText.LOADING);

async function initCalc() {
	try {
		const data = await getData();
		renderSelect(data);
		initDiscountTimer();

	} catch (error) {
		console.log(error);
	} finally {
		hideOverlay()
	}
}

initCalc();