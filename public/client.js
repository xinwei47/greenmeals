// hide element
const toggleClass = (element, className = '') => element.classList.toggle(className);
const addClass = (element, className = '') => element.classList.add(className);
const removeClass = (element, className = '') => element.classList.remove(className);

const advancedToggle = document.querySelector('.search__advanced-toggle');
const advancedSearchBlock = document.querySelector('.search__advanced');
const flash = document.querySelector('.flash');
const flashBtnClose = document.querySelector('.flash__btn');

// advanced search button to toggle the additional criteria
advancedToggle.addEventListener('click', () => toggleClass(advancedSearchBlock, 'hidden'));

// flash btn to close the flash block
flashBtnClose.addEventListener('click', () => addClass(flash, 'hidden'));