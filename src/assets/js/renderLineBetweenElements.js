// *** Функция отрисовки линии между двумя элементами ***
const renderLineBetweenElements = (firstElement, secondElement, necessaryClassName) => {
	// --- Функция для перерасчёта свойств элементов ---
	const calculateElementProperties = () => {
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

		const lineWidth = secondElementProperty.x - firstElementProperty.x;
		const firstElementHalfWidth = firstElementProperty.width / 2;

		return {
			lineWidth: lineWidth,
			firstElementHalfWidth: firstElementHalfWidth,
		};
	};

	// --- Первичная установка значений для линии ---
	const widthOfLineBetween = calculateElementProperties().lineWidth;
	const leftShift = calculateElementProperties().firstElementHalfWidth;

	const lineBetweenNode = document.createElement('div');
	lineBetweenNode.classList.add(necessaryClassName);
	lineBetweenNode.style = `
    top: 50%;
		left: ${leftShift}px;
    transform: translateY(-50%);
		width: ${widthOfLineBetween}px;
	`;
	firstElement.appendChild(lineBetweenNode);

	const onWindowResize = () => {
		const recalculatedLineWidth = calculateElementProperties().lineWidth + 'px';
		lineBetweenNode.style.width = recalculatedLineWidth;
	};

	// --- Обработчик события ресайза страницы ---
	window.addEventListener('resize', onWindowResize);

	//--- Удаляем элемент, добавленный в DOM, чтобы Webpack HMR не добавил его повторно ---
	if (module.hot) {
		module.hot.dispose(() => {
			lineBetweenNode.parentNode.removeChild(lineBetweenNode);
			window.removeEventListener('resize', onWindowResize);
		});
	}
};

export default renderLineBetweenElements;
