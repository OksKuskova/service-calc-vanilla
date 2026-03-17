import { Method, ErrorText } from "./api.const.js";

const { GET, POST } = Method;
const { GET_ERROR, POST_ERROR } = ErrorText;

async function apiRequest(url, errorText, method = GET, body = null) {
	try {
		const response = await fetch(url, { method, body });

		if (!response.ok) {
			throw new Error(`${errorText} (${response.status})`)
		}

		const data = await response.json();

		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.log(`${errorText} (${error.message})`)
	}
};

const getData = () => apiRequest('/materials.json', GET_ERROR);

export { getData };