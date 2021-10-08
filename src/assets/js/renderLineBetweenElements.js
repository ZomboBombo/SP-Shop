// *** Функция отрисовки линии между двумя элементами ***
const renderLineBetweenElements = (firstElement, secondElement, necessaryClassName) => {
	const firstElementRect = firstElement.getBoundingClientRect();
	const secondElementRect = secondElement.getBoundingClientRect();

	const firstElementProperty = {
		x: Math.floor(firstElementRect.x),
		y: Math.floor(firstElementRect.y),

		width: Math.floor(firstElementRect.width),
		height: Math.floor(firstElementRect.height),
	};

	const secondElementProperty = {
		x: Math.floor(secondElementRect.x),
		y: Math.floor(secondElementRect.y),

		width: Math.floor(secondElementRect.width),
		height: Math.floor(secondElementRect.height),
	};

	const lineBetweenWidth = secondElementProperty.x - firstElementProperty.x;
	const firstElementHalfWidth = firstElementProperty.width / 2;

	const lineBetweenNode = document.createElement('div');
	lineBetweenNode.classList.add(necessaryClassName);
	lineBetweenNode.style = `
    top: 50%;
		left: ${firstElementHalfWidth}px;
    transform: translateY(-50%);
		width: ${lineBetweenWidth}px;
	`;
	firstElement.appendChild(lineBetweenNode);

	//--- Удаляем элемент, добавленный в DOM, чтобы Webpack HMR не добавил его повторно ---
	if (module.hot) {
		module.hot.dispose(() => {
			lineBetweenNode.parentNode.removeChild(lineBetweenNode);
		});
	}
};

export default renderLineBetweenElements;
