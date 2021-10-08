import Util from 'utils/utility-constants';
import getObserverOfBasketFilling from './observerOfElementChanges';

// ---------- КОНСТАНТЫ -----------
const EMPTY_BASKET_NOTIFICATION_SHOW_MOD = 'empty-basket-notification--show';
const BASKET_CONTENT_LIST_HIDE_MOD = 'basket-content__products--hide';

// --------- DOM-элементы ---------
const basketContent = document.querySelector('#basket-content');
const basketContentProductList = basketContent.querySelector('#basket-content-products-list');
const emptyBasketNotification = basketContent.querySelector('#empty-basket-notification');

/*
===============================================
--------------- ОСНОВНАЯ ЛОГИКА ---------------
===============================================
*/
const notifyAboutemptyBasket = () => {
	switch (Util.IS_TRUE) {
		case basketContentProductList.children.length === Util.ZERO_VALUE:
			emptyBasketNotification.classList.add(EMPTY_BASKET_NOTIFICATION_SHOW_MOD);
			basketContentProductList.classList.add(BASKET_CONTENT_LIST_HIDE_MOD);
			break;

		default:
			emptyBasketNotification.classList.remove(EMPTY_BASKET_NOTIFICATION_SHOW_MOD);
			basketContentProductList.classList.remove(BASKET_CONTENT_LIST_HIDE_MOD);
	}
};

/*
=============================================================================================
--------- Экспортируемая функция, описывающая логику отслеживания "пустоты" Корзины ---------
=============================================================================================
*/
const trackEmptyBasket = () => {
	getObserverOfBasketFilling(basketContentProductList, notifyAboutemptyBasket);
};

export default trackEmptyBasket;
