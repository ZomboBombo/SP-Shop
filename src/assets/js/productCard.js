import Util from 'utils/utility-constants';

// ----------- КОНСТАНТЫ ----------
const ELEMENT_TYPE_BUTTON = 'BUTTON';
const COUNT_BUTTON_SUBTRACT_MOD = 'product-card__goods-count-toggle--subtract';
const COUNT_BUTTON_ADD_MOD = 'product-card__goods-count-toggle--add';

// --------- DOM-элементы ---------
const basketContent = document.querySelector('#basket-content');
const productCards = basketContent.querySelectorAll('.product-card');

/*
===============================================
--------------- ОСНОВНАЯ ЛОГИКА ---------------
===============================================
*/

// *** Функции для перерасчёта стоимости товара в зависимости от выбранного количества ***
const decreaseProductCost = costElement => {
	const productPrice = Number(costElement.dataset.productCost.match(Util.NUMBER_REG_EXP));
	let productTotalCost = Number(costElement.textContent.match(Util.NUMBER_REG_EXP));
	productTotalCost -= productPrice;

	costElement.textContent = Util.DOLLAR_SIGN + productTotalCost;
};

const increaseProductCost = costElement => {
	const productPrice = Number(costElement.dataset.productCost.match(Util.NUMBER_REG_EXP));
	let productTotalCost = Number(costElement.textContent.match(Util.NUMBER_REG_EXP));
	productTotalCost += productPrice;

	costElement.textContent = Util.DOLLAR_SIGN + productTotalCost;
};

/*
 * *** Главная функция: добавление всех внутренних обработчиков Карточки товара ***
 */
const addProductCardHandlers = productCard => {
	const cardBox = productCard.parentNode;

	const countToggles = productCard.querySelectorAll('.product-card__goods-count-toggle');
	const countToggleSubtract = productCard.querySelector(
		'.product-card__goods-count-toggle--subtract'
	);
	const countOutput = productCard.querySelector('.product-card__goods-count-output');
	const removeButton = productCard.querySelector('.product-card__remove-button');
	const productCostElement = productCard.querySelector('.product-card__total-cost');

	// *** Функция для проверки значения количества товаров ***
	const checkOutputValue = () => {
		if (countOutput.value >= 1) {
			countToggleSubtract.disabled = Util.IS_FALSE;
		} else {
			countToggleSubtract.disabled = Util.IS_TRUE;
			countOutput.value = Util.ZERO_VALUE;
		}
	};

	// *** Функция для события Клика по кнопкам уменьшения/увеличения кол-ва товара ***
	const onCountToggleClick = evt => {
		evt.preventDefault();

		let currentToggle;

		/*
		 * *** Условие проверки evt.target:
		 * *** ---------
		 * *** ЕСЛИ тип элемента внутри evt.target — это <button>,
		 * *** тогда currentToggle присваивается значение evt.target
		 * ***
		 * *** ИНАЧЕ — evt.target находит ближайшего родителя, являющегося
		 * *** эл-том <button>, и только тогда currentToggle присваивается
		 * *** соответствующее значение.
		 */
		if (evt.target.nodeName === ELEMENT_TYPE_BUTTON) {
			currentToggle = evt.target;
		} else {
			currentToggle = evt.target.closest(ELEMENT_TYPE_BUTTON);
		}

		// --- Уменьшение/увеличение значений кол-ва продуктов и общей стоимости продукта ---
		switch (Util.IS_TRUE) {
			case currentToggle.classList.contains(COUNT_BUTTON_SUBTRACT_MOD):
				countOutput.value--;
				decreaseProductCost(productCostElement);
				break;

			case currentToggle.classList.contains(COUNT_BUTTON_ADD_MOD):
				countOutput.value++;
				increaseProductCost(productCostElement);
				break;

			default:
				countOutput.value;
		}

		checkOutputValue();
	};

	// *** Функция для УДАЛЕНИЯ карточки товара из Корзины ***
	const onRemoveButtonClick = evt => {
		evt.preventDefault();

		countOutput.value = Util.ZERO_VALUE;
		productCostElement.textContent = Util.ZERO_VALUE;

		cardBox.remove();

		// --- Удаление обработчиков событий ---
		for (const countToggle of countToggles) {
			countToggle.removeEventListener('click', onCountToggleClick);
		}
		removeButton.removeEventListener('click', onRemoveButtonClick);
	};

	/*
	 * ====== Обработчики событий и необходимые вызовы ф-ций ======
	 */
	for (const countToggle of countToggles) {
		countToggle.addEventListener('click', onCountToggleClick);

		// --- Удаляем обработчик события, чтобы Webpack HMR не добавил его повторно ---
		if (module.hot) {
			module.hot.dispose(() => {
				countToggle.removeEventListener('click', onCountToggleClick);
			});
		}
	}

	removeButton.addEventListener('click', onRemoveButtonClick);

	// --- Удаляем обработчик события, чтобы Webpack HMR не добавил его повторно ---
	if (module.hot) {
		module.hot.dispose(() => {
			removeButton.removeEventListener('click', onRemoveButtonClick);
		});
	}

	checkOutputValue();
};

/*
==============================================================================
--------- Экспортируемая функция, описывающая логику Карточки товара ---------
==============================================================================
*/
const productCardLogic = () => {
	for (const card of productCards) {
		addProductCardHandlers(card);
	}
};

export default productCardLogic;
