import Util from 'utils/utility-constants';
import getObserverOfBasket from './observerOfElementChanges';

// ----------- КОНСТАНТЫ ----------
const SIDEBAR_OPEN_MOD = 'site-main-content__sidebar--open';
const BASKET_ITEMS_COUNTER_SHOW_MOD = 'site-header__basket-items-counter--show-items-count';

// --------- DOM-элементы ---------
const basketButton = document.querySelector('#basket-button');
const basketButtonItemsCounter = basketButton.querySelector('#basket-items-counter');
const sidebarBox = document.querySelector('#sidebar-box');
const basketItemsList = sidebarBox.querySelector('#basket-content-products-list');

/*
===============================================
--------------- ОСНОВНАЯ ЛОГИКА ---------------
===============================================
*/

// --- Первичная активация счётчика товаров в Корзине ---
basketButtonItemsCounter.textContent = basketItemsList.children.length;
basketButtonItemsCounter.classList.add(BASKET_ITEMS_COUNTER_SHOW_MOD);

// *** Коллбек для Наблюдателя за состоянием Корзины ***
const observerOfBasketCallback = () => {
	switch (Util.IS_TRUE) {
		case basketItemsList.children.length !== Util.ZERO_VALUE:
			basketButtonItemsCounter.textContent = basketItemsList.children.length;
			basketButtonItemsCounter.classList.add(BASKET_ITEMS_COUNTER_SHOW_MOD);
			break;

		default:
			basketButtonItemsCounter.classList.remove(BASKET_ITEMS_COUNTER_SHOW_MOD);
	}
};

// --- Инициализация наблюдения за состоянием Корзины ---
getObserverOfBasket(basketItemsList, observerOfBasketCallback);

// *** Функция для обработки события клика на кнопку Корзины ***
const onBasketClick = evt => {
	evt.preventDefault();

	switch (Util.IS_TRUE) {
		case sidebarBox.classList.contains(SIDEBAR_OPEN_MOD):
			sidebarBox.classList.remove(SIDEBAR_OPEN_MOD);
			break;

		default:
			sidebarBox.classList.add(SIDEBAR_OPEN_MOD);
	}
};

// *** Функция для обработчика события клика по Корзине ***
const activateBasketButton = () => {
	basketButton.addEventListener('click', onBasketClick);

	// --- Удаляем обработчик события, чтобы Webpack HMR не добавил его повторно ---
	if (module.hot) {
		module.hot.dispose(() => {
			basketButton.removeEventListener('click', onBasketClick);
		});
	}
};

export default activateBasketButton;
