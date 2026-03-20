import { getData } from "./api/api.js";
import { initForm } from "./form/form.js";
import { OverlayText } from "./overlay/overlay.const.js";
import { hideOverlay, showOverlay } from "./overlay/overlay.js";
import { renderSelect } from "./select.js";
import { initDiscountTimer } from "./timer/timer.js";
import { updateTotal } from "./total/total.js";

let materialsData = [];

showOverlay(OverlayText.LOADING);

async function initCalc() {
	try {
		materialsData = await getData();
		renderSelect(materialsData);
		updateTotal();
		initDiscountTimer();
		initForm();

	} catch (error) {
		console.log(error);
	} finally {
		hideOverlay()
	}
}

initCalc();

export { materialsData }