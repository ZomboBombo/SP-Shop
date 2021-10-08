import Util from 'utils/utility-constants';
import renderLineBetweenElements from './renderLineBetweenElements';

// ---------- КОНСТАНТЫ -----------
const EMPTY_ELEMENT = null;
const FIRST_ARRAY_ELEMENT = 0;
const MOCK_BUTTON_NEXT_MOD = 'mock-section__button--submit';

const BreadcrumbButtonMod = {
	DISABLED: 'payment-breadcrumbs__step-button--disabled',
	ACTIVE: 'payment-breadcrumbs__step-button--active',
	PASSED: 'payment-breadcrumbs__step-button--passed',
};

const PaymentStepMod = {
	JS_ENABLED: 'payment-step--js-enabled',
	ACTIVE: 'payment-step--active',
};

// --------- DOM-элементы ---------
const paymentBreadcrumbsSection = document.querySelector('.payment-steps-interface');
const paymentBreadcrumbs = paymentBreadcrumbsSection.querySelector('#payment-breadcrumbs');
const paymentBreadcrumbButtons = paymentBreadcrumbs.querySelectorAll(
	'.payment-breadcrumbs__step-button'
);

const mockSectionButtons = document.querySelectorAll('.mock-section__button');
const firstMockSectionButton = Array.from(mockSectionButtons)[FIRST_ARRAY_ELEMENT];

const paymentStepSections = document.querySelectorAll('.payment-step');

/*
===============================================
--------------- ОСНОВНАЯ ЛОГИКА ---------------
===============================================
*/

// --- Установка класса для отображения секции с "хлебными крошками" ---
paymentBreadcrumbsSection.classList.add('payment-steps-interface--js-enabled');

// --- Установка кнопок "хлебных крошек" в нужное состояние ---
paymentBreadcrumbButtons.forEach((breadcrumbButton, index) => {
	switch (Util.IS_TRUE) {
		case index === FIRST_ARRAY_ELEMENT:
			breadcrumbButton.classList.add(BreadcrumbButtonMod.ACTIVE);
			break;

		default:
			breadcrumbButton.disabled = Util.IS_TRUE;
			breadcrumbButton.classList.add(BreadcrumbButtonMod.DISABLED);
	}
});

// --- Скрытие соответствующих секций шагов оплаты ---
paymentStepSections.forEach((paymentStep, index) => {
	paymentStep.classList.remove(PaymentStepMod.ACTIVE);
	paymentStep.classList.add(PaymentStepMod.JS_ENABLED);

	if (index === FIRST_ARRAY_ELEMENT) {
		paymentStep.classList.add(PaymentStepMod.ACTIVE);
	}
});

// *** Функция логики изменения кнопок "хлебных крошек" ***
const changeBreadcrumbs = (currentBreadcrumbButton, indexOfcurrentBreadcrumbButton) => {
	let nextBreadcrumbButton = EMPTY_ELEMENT;
	const lineBetweenElementsClass = 'payment-breadcrumbs__line-between-counters';

	currentBreadcrumbButton.classList.add(BreadcrumbButtonMod.PASSED);
	const currentStepCounter = currentBreadcrumbButton.querySelector(
		'.payment-breadcrumbs__step-button-counter'
	);

	nextBreadcrumbButton = paymentBreadcrumbButtons[indexOfcurrentBreadcrumbButton + 1];
	const nextStepCounter = nextBreadcrumbButton.querySelector(
		'.payment-breadcrumbs__step-button-counter'
	);

	nextBreadcrumbButton.disabled = Util.IS_FALSE;
	nextBreadcrumbButton.classList.add(BreadcrumbButtonMod.ACTIVE);

	const lineBetweenElements = currentBreadcrumbButton.querySelector(
		'.payment-breadcrumbs__line-between-counters'
	);

	// --- Предотвращение повторной отрисовки линии ---
	if (lineBetweenElements === EMPTY_ELEMENT) {
		renderLineBetweenElements(currentStepCounter, nextStepCounter, lineBetweenElementsClass);
	}
};

// *** Функция для вычисления следующей кнопки "хлебных крошек" ***
const calculateNextBreadcrumbButton = paymentStepSection => {
	let indexOfCurrentElement = FIRST_ARRAY_ELEMENT;

	for (const currentStepBreadcrumb of paymentBreadcrumbButtons) {
		switch (Util.IS_TRUE) {
			case currentStepBreadcrumb.dataset.id === paymentStepSection.dataset.id:
				changeBreadcrumbs(currentStepBreadcrumb, indexOfCurrentElement);
				break;

			default:
				indexOfCurrentElement++;
		}
	}
};

// *** Функция для переключения секций Шагов оплаты ***
const togglePaymentStepSection = (firstSection, secondSection, necessaryClassName) => {
	firstSection.classList.remove(necessaryClassName);
	secondSection.classList.add(necessaryClassName);
};

// *** Функция для обработки события клика на кнопки внутри Моковых секций ***
const onMockButtonClick = evt => {
	evt.preventDefault();

	const currentMockButton = evt.target;
	const currentPaymentStepSection = currentMockButton.closest('.payment-step');
	const previousPaymentSection = currentPaymentStepSection.previousElementSibling;
	const nextPaymentSection = currentPaymentStepSection.nextElementSibling;

	switch (Util.IS_TRUE) {
		case currentMockButton.classList.contains(MOCK_BUTTON_NEXT_MOD):
			calculateNextBreadcrumbButton(currentPaymentStepSection);
			togglePaymentStepSection(
				currentPaymentStepSection,
				nextPaymentSection,
				PaymentStepMod.ACTIVE
			);
			break;

		default:
			if (currentMockButton !== firstMockSectionButton) {
				togglePaymentStepSection(
					currentPaymentStepSection,
					previousPaymentSection,
					PaymentStepMod.ACTIVE
				);
			}
	}
};

// *** Функция для обработчика события клика на кнопку из "хлебных крошек" ***
const onBreadcrumbClick = evt => {
	evt.preventDefault();

	const currentBreadcrumb = evt.target.parentNode;

	for (const paymentStep of paymentStepSections) {
		switch (Util.IS_TRUE) {
			case currentBreadcrumb.dataset.id === paymentStep.dataset.id:
			case evt.target.dataset.id === paymentStep.dataset.id:
				paymentStep.classList.add(PaymentStepMod.ACTIVE);
				break;

			default:
				paymentStep.classList.remove(PaymentStepMod.ACTIVE);
		}
	}
};

/*
=====================================================================================================
--------- Экспортируемая функция, описывающая логику перерасчёта ИТОГОВОЙ стоимости покупки ---------
=====================================================================================================
*/
const paymentLogic = () => {
	mockSectionButtons.forEach(mockButton => {
		mockButton.addEventListener('click', onMockButtonClick);
	});

	paymentBreadcrumbButtons.forEach(breadcrumbButton => {
		breadcrumbButton.addEventListener('click', onBreadcrumbClick);
	});
};

export default paymentLogic;
