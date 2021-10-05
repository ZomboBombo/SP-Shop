import Util from 'utils/utility-constants';

// --------- DOM-элементы ---------
const basketContent = document.querySelector('#basket-content');
const basketContentItemsList = basketContent.querySelector('.basket-content__products');
const basketContentItems = basketContentItemsList.querySelectorAll(
	'.basket-content__products-item'
);
const basketContentItemsCosts = basketContentItemsList.querySelectorAll(
	'.product-card__total-cost'
);

const totalPurchaseCostSection = document.querySelector('#total-purchase-cost');
const paymentTable = totalPurchaseCostSection.querySelector('.payment-table');
const paymentTableRows = paymentTable.querySelectorAll('.payment-table__row');
const paymentTableSubtotalRow = paymentTable.querySelector('#purchase-cost--subtotal');
const paymentTableSubtotalValue = paymentTableSubtotalRow.querySelector('.payment-table__row-data');
const paymentTableTotalRow = paymentTable.querySelector('#purchase-cost--total');
const paymentTableTotalRowValue = paymentTableTotalRow.querySelector('.payment-table__row-data');

/*
===============================================
--------------- ОСНОВНАЯ ЛОГИКА ---------------
===============================================
*/

// *** Универсальная ф-ция для отслеживания изменений конкретного DOM-узла ***
const observeElementChanges = (observerTarget, observerCallbackLogic) => {
	// --- Объект-конфиг для Наблюдателя ---
	const observerConfig = {
		childList: Util.IS_TRUE,
		characterData: Util.IS_TRUE,
		subtree: Util.IS_TRUE,
	};

	// --- Коллбек с логикой для Наблюдателя ---
	const observerCallback = mutationsList => {
		mutationsList.forEach(mutation => {
			if (mutation.type) {
				observerCallbackLogic();
			}
		});
	};

	// --- Новый экземпляр класса Наблюдателя ---
	const observer = new MutationObserver(observerCallback);

	// --- Наблюдение за нужным элементом ---
	observer.observe(observerTarget, observerConfig);

	/*
	 * *** ЕСЛИ количество потомков наблюдаемого элемента равно 0,
	 * *** ОТКЛЮЧИТЬ/ПРЕКРАТИТЬ наблюление за элементом
	 * ***
	 * *** !!!!!! НУЖНО ПРИДУМАТЬ КОРРЕКТНЫЙ СПОСОБ ОТКЛЮЧЕНИЯ НАБЛЮДАТЕЛЯ !!!!!!
	 */
	// if (observerTarget.childElementCount === Util.ZERO_VALUE) {
	// 	observer.disconnect();
	// }
};

// *** Функция для получения массива табличных данных о стоимости ***
const getArrayOfTableData = () => {
	const arrayOfTableData = [];

	for (const tableRow of paymentTableRows) {
		if (tableRow !== paymentTableTotalRow) {
			const tableRowData = tableRow.querySelector('.payment-table__row-data');
			arrayOfTableData.push(tableRowData.textContent);
		}
	}

	return arrayOfTableData;
};

// *** Функция для перерасчёта Подытоговой стоимости покупки ***
const calculateSubtotal = () => {
	let subtotalValue = 0;

	for (const basketItemCost of basketContentItemsCosts) {
		subtotalValue += Number(basketItemCost.textContent.match(Util.NUMBER_REG_EXP));
	}

	paymentTableSubtotalValue.textContent = Util.DOLLAR_SIGN + subtotalValue;
};

// *** Функция для перерасчёта Итоговой стоимости покупки ***
const calculateTotalCost = () => {
	let totalCost = 0;
	const tableCostsArray = getArrayOfTableData();

	tableCostsArray.forEach(element => {
		totalCost += Number(element.match(Util.NUMBER_REG_EXP));
	});

	paymentTableTotalRowValue.textContent = Util.DOLLAR_SIGN + totalCost;
};

// *** Ф-ция для отслеживания изменения состояний стоимости товаров в Корзине ***
const onProductCostChange = itemInBasket => {
	observeElementChanges(itemInBasket, calculateSubtotal);
};

// *** Ф-ция для отслеживания изменения количества товаров в Корзине ***
const onBasketContentChange = () => {
	observeElementChanges(basketContentItemsList, calculateSubtotal);
};

const onSubtotalChange = () => {
	observeElementChanges(paymentTableSubtotalValue, calculateTotalCost);
};

/*
=====================================================================================================
--------- Экспортируемая функция, описывающая логику перерасчёта ИТОГОВОЙ стоимости покупки ---------
=====================================================================================================
*/
const changeTotalCost = () => {
	calculateSubtotal();
	calculateTotalCost();

	for (const basketItem of basketContentItems) {
		onProductCostChange(basketItem);
	}

	onBasketContentChange();
	onSubtotalChange();
};

export default changeTotalCost;
