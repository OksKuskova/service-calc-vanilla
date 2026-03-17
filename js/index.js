import { getData } from "./api/api.js";
import { renderSelect } from "./select.js";

async function initCalc() {
	try {
		const data = await getData();
		renderSelect(data);

	} catch (error) {
		console.log(error);
	}
}

initCalc();