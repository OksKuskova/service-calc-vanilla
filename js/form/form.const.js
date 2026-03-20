export const NOT_NUMERIC_REGEX = /\D/g;

export const ValidationMessages = {
	NUMERIC_ONLY: 'Можно ввести только число',
	REQUIRED: 'Поле обязательно для заполнения',
	SERVER_ERROR: 'Сервис временно недоступен, мы уже чиним',
};

export const VALIDATION_MESSAGE_CLASS = 'message';

export const ValidationMessageClassModificator = {
	HINT: `${VALIDATION_MESSAGE_CLASS}--hint`,
	ERROR: `${VALIDATION_MESSAGE_CLASS}--error`,
}