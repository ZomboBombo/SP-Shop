import Util from 'utils/utility-constants';

// ---------- КОНСТАНТЫ -----------
const TABINDEX_DISABLED = -1;
const TABLET_VIEWPORT_WIDTH = 1199;
const BODY_MODAL_STATE_CLASS = 'modal-window-active';
const NAVIGATION_MENU_OPEN_MOD = 'navigation-menu--open';
const NAVIGATION_MENU_OPEN_BUTTON_TRANSFORM_MOD = 'site-header__burger--transform-to-close-button';

const EscapeKey = {
	FULL_NAME: 'Escape',
	ABBREVIATED_NAME: 'Esc',
};

// --------- DOM-элементы ---------
const body = document.querySelector('body');

const siteHeader = body.querySelector('#site-header');
const navigationMenu = siteHeader.querySelector('#site-navigation-menu');
const navigationMenuLinks = navigationMenu.querySelectorAll('.navigation-menu__link');
const navigationMenuButton = siteHeader.querySelector('#navigation-menu-open-button');

/*
===============================================
--------------- ОСНОВНАЯ ЛОГИКА ---------------
===============================================
*/

// *** Функции для расфокусировки и фокусировки ссылок Навигационного меню ***
const defocuseNavMenuLinks = () => {
	navigationMenuLinks.forEach(menuLink => {
		menuLink.setAttribute('tabindex', TABINDEX_DISABLED);
	});
};

const focuseNavMenuLinks = () => {
	navigationMenuLinks.forEach(menuLink => {
		menuLink.removeAttribute('tabindex');
	});
};

/*
 * --- Условие, отрабатывающее при первой инициализции скрипта:
 * ----------
 * --- ЕСЛИ ширина вьюпорта меньше установленной Планшетной ширины (1200px),
 * --- ТО расфокусировать ссылки Навигационного меню.
 */
if (document.documentElement.clientWidth <= TABLET_VIEWPORT_WIDTH) {
	defocuseNavMenuLinks();
}

// *** Функция для открытия/закрытия Навигационного меню ***
const toggleNavigationMenuState = () => {
	switch (Util.IS_TRUE) {
		case navigationMenu.classList.contains(NAVIGATION_MENU_OPEN_MOD):
			navigationMenu.classList.remove(NAVIGATION_MENU_OPEN_MOD);
			navigationMenuButton.classList.remove(NAVIGATION_MENU_OPEN_BUTTON_TRANSFORM_MOD);
			defocuseNavMenuLinks();
			body.classList.remove(BODY_MODAL_STATE_CLASS);
			break;

		default:
			navigationMenu.classList.add(NAVIGATION_MENU_OPEN_MOD);
			navigationMenuButton.classList.add(NAVIGATION_MENU_OPEN_BUTTON_TRANSFORM_MOD);
			focuseNavMenuLinks();
			body.classList.add(BODY_MODAL_STATE_CLASS);
	}
};

// *** Функция для обработки события нажатия клваиши "Escape" ***
const onEscPress = evt => {
	if (evt.key === EscapeKey.FULL_NAME || evt.key === EscapeKey.ABBREVIATED_NAME) {
		toggleNavigationMenuState();
		document.removeEventListener('keydown', onEscPress);
	}
};

// *** Функция для обработки события клика на кнопку открытия/закрытия Навигационного меню ***
const onNavMenuButtonClick = evt => {
	evt.preventDefault();

	toggleNavigationMenuState();
	document.addEventListener('keydown', onEscPress);
};

/*
=====================================================================================================
--------- Экспортируемая функция, описывающая логику перерасчёта ИТОГОВОЙ стоимости покупки ---------
=====================================================================================================
*/
const openNavigationMenu = () => {
	navigationMenuButton.addEventListener('click', onNavMenuButtonClick);

	// --- Удаляем обработчик события, чтобы Webpack HMR не добавил его повторно ---
	if (module.hot) {
		module.hot.dispose(() => {
			navigationMenuButton.removeEventListener('click', onNavMenuButtonClick);
		});
	}
};

export default openNavigationMenu;
