const selectWrapperElement = document.querySelector('[data-js-select-wrapper]');
const selectElement = document.querySelector('[data-js-select]');

const renderSelect = (options) => {
	if (options.length === 0) {
		selectWrapperElement.classList.add('disabled');
		selectElement.disabled = true;
		selectElement.innerHTML = '<option disabled selected>Нет доступных материалов</option>';
	} else {
		selectElement.innerHTML = options.map(({ name }) => `
			<option value='${name}'>${name}</option>
		`).join('');
	}
};

export { renderSelect }
