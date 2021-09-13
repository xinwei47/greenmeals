// hide element
const toggleClass = (element, className = '') => element.classList.toggle(className);
const addClass = (element, className = '') => element.classList.add(className);
const removeClass = (element, className = '') => element.classList.remove(className);

const advancedToggle = document.querySelector('.search__advanced-toggle');
const advancedSearchBlock = document.querySelector('.search__advanced');

// advanced search button to toggle the additional criteria
advancedToggle.addEventListener('click', () => toggleClass(advancedSearchBlock, 'hidden'));
