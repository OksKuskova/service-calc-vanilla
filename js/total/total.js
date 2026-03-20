import { materialsData } from "../index.js";
import { formValidate } from "../form/form.utils.js";

const quantityInputElement = document.getElementById('quantity');
const materialInputElement = document.getElementById('material');

const summaryElement = document.querySelector('[data-js-summary]');
const discountElement = document.querySelector('[data-js-discount]');

const getMaterialPrice = (materialName) => {
	const material = materialsData.find((m) => m.name === materialName);

	return material ? material.price : 0;
}

const calculateTotal = () => {
	const material = materialInputElement?.value;
	const quantity = parseFloat(quantityInputElement?.value) || 0;
	const discountPercent = parseFloat(discountElement?.textContent) || 0;

	const pricePerUnit = getMaterialPrice(material);

	let totalPrice = pricePerUnit * quantity;

	if (discountPercent > 0) {
		totalPrice = totalPrice * (1 - discountPercent / 100);
	}

	return Math.round(totalPrice);
}

const updateTotal = () => {
	const { isValid } = formValidate();

	if (isValid) {
		const totalPrice = calculateTotal();

		summaryElement.textContent = totalPrice;
	} else {
		summaryElement.textContent = '-';
	}
}

export { updateTotal }