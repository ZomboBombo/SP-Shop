import UtilityConstants from 'utils/utility-constants';

// ----------- КОНСТАНТЫ ----------
const SIDEBAR_OPEN_MOD = 'site-main-content__sidebar--open';

// --------- DOM-элементы ---------
const basketButton = document.querySelector('#basket-button');
const sidebarBox = document.querySelector('#sidebar-box');

/*
===============================================
--------------- ОСНОВНАЯ ЛОГИКА ---------------
===============================================
*/
const onBasketClick = evt => {
	evt.preventDefault();

	switch (UtilityConstants.IS_TRUE) {
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
