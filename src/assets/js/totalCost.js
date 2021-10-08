import Util from 'utils/utility-constants';
import getNewObserver from './observerOfElementChanges';

// ---------- КОНСТАНТЫ -----------
const ZERO_DOLLARS = Util.DOLLAR_SIGN + Util.ZERO_VALUE;

// --------- DOM-элементы ---------
const basketContent = document.querySelector('#basket-content');
const basketContentItemsList = basketContent.querySelector('.basket-content__products');
const basketContentItemsCosts = basketContentItemsList.querySelectorAll(
	'.product-card__total-cost'
);

const totalPurchaseCostSection = document.querySelector('#total-purchase-cost');

const paymentTable = totalPurchaseCostSection.querySelector('.payment-table');
const paymentTableRows = paymentTable.querySelectorAll('.payment-table__row');

const paymentTableSubtotalRow = paymentTable.querySelector('#purchase-cost--subtotal');
const paymentTableSubtotalValue = paymentTableSubtotalRow.querySelector('.payment-table__row-data');

const paymentTableTaxRow = paymentTable.querySelector('#purchase-cost--tax');
const paymentTableTaxValue = paymentTableTaxRow.querySelector('.payment-table__row-data');
const initialTaxValue = paymentTableTaxValue.textContent;

const paymentTableShippingRow = paymentTable.querySelector('#purchase-cost--shipping');
const paymentTableShippingValue = paymentTableShippingRow.querySelector('.payment-table__row-data');
const initialShippingValue = paymentTableShippingValue.textContent;

const paymentTableTotalRow = paymentTable.querySelector('#purchase-cost--total');
const paymentTableTotalValue = paymentTableTotalRow.querySelector('.payment-table__row-data');

/*
===============================================
--------------- ОСНОВНАЯ ЛОГИКА ---------------
===============================================
*/

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

	const integerSubtotalValue = Number(
		paymentTableSubtotalValue.textContent.match(Util.NUMBER_REG_EXP)
	);

	if (integerSubtotalValue === Util.ZERO_VALUE) {
		paymentTableTaxValue.textContent = ZERO_DOLLARS;
		paymentTableShippingValue.textContent = ZERO_DOLLARS;
	} else {
		paymentTableTaxValue.textContent = initialTaxValue;
		paymentTableShippingValue.textContent = initialShippingValue;
	}
};

// *** Функция для перерасчёта Итоговой стоимости покупки ***
const calculateTotalCost = () => {
	let totalCost = 0;
	const tableCostsArray = getArrayOfTableData();

	tableCostsArray.forEach(element => {
		totalCost += Number(element.match(Util.NUMBER_REG_EXP));
	});

	paymentTableTotalValue.textContent = Util.DOLLAR_SIGN + totalCost;
};

// *** Ф-ция для отслеживания изменения состояний стоимости товаров в Корзине ***
const observeProductCostChange = () => {
	for (const basketItemCost of basketContentItemsCosts) {
		getNewObserver(basketItemCost, calculateSubtotal);
	}
};

// *** Ф-ция для отслеживания изменения количества товаров в Корзине ***
const observeBasketContentChange = () => {
	getNewObserver(basketContentItemsList, calculateSubtotal);
};

const observeSubtotalChange = () => {
	getNewObserver(paymentTableSubtotalValue, calculateTotalCost);
};

/*
=====================================================================================================
--------- Экспортируемая функция, описывающая логику перерасчёта ИТОГОВОЙ стоимости покупки ---------
=====================================================================================================
*/
const changeTotalCost = () => {
	calculateSubtotal();
	calculateTotalCost();

	observeProductCostChange();
	observeBasketContentChange();
	observeSubtotalChange();
};

export default changeTotalCost;
