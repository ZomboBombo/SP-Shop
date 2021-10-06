import activateBasketButton from './basketButton';
import productCardLogic from './productCard';
import totalCostCalculation from './totalCost';
import trackEmptyBasket from './emptyBasketFiller';
import openNavigationMenu from './openNavigationMenu';

activateBasketButton();
productCardLogic();
totalCostCalculation();
trackEmptyBasket();
openNavigationMenu();

if (module.hot) {
	module.hot.accept();
}
