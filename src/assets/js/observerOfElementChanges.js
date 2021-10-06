import Util from 'utils/utility-constants';

// *** Универсальная ф-ция для отслеживания изменений конкретного DOM-узла ***
const observerOfElementChanges = (observerTarget, observerCallbackLogic) => {
	// --- Объект-конфиг для Наблюдателя ---
	const observerConfig = {
		childList: Util.IS_TRUE,
		characterData: Util.IS_TRUE,
		subtree: Util.IS_TRUE,
	};

	// --- Коллбек с логикой для Наблюдателя ---
	const observerCallback = mutationsList => {
		mutationsList.forEach(mutation => {
			if (mutation.type === 'childList' || mutation.type === 'subtree') {
				observerCallbackLogic();
			}
		});
	};

	// --- Новый экземпляр класса Наблюдателя ---
	const observer = new MutationObserver(observerCallback);

	// --- Наблюдение за нужным элементом ---
	observer.observe(observerTarget, observerConfig);

	return observer;
};

export default observerOfElementChanges;
