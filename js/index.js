import { getData } from "./api/api.js"

async function initCalc() {
	try {
		const data = await getData();
		console.log(data);

	} catch (error) {
		console.log(error);
	}
}

initCalc();