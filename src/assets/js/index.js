import activateBasketButton from './basketButton';
import productCardLogic from './productCard';
import totalCostCalculation from './totalCost';
import trackEmptyBasket from './emptyBasketFiller';
import openNavigationMenu from './openNavigationMenu';
import paymentLogic from './paymentLogic';

activateBasketButton();
productCardLogic();
totalCostCalculation();
trackEmptyBasket();
openNavigationMenu();
paymentLogic();

if (module.hot) {
	module.hot.accept();
}
