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
if (flashBtnClose) {
    flashBtnClose.addEventListener('click', () => addClass(flash, 'hidden'));
};

// add styling to selected menu item
const favorite = document.querySelector('#favorites');
if (favorite) {
    addClass(favorite.parentNode, 'selected');
}

const management = document.querySelector('#management');
if (management) {
    addClass(management.parentNode, 'selected');
}