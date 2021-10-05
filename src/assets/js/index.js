import activateBasketButton from './basketButton';
import productCardLogic from './productCard';
import totalCostCalculation from './totalCost';

activateBasketButton();
productCardLogic();
totalCostCalculation();

if (module.hot) {
	module.hot.accept();
}
