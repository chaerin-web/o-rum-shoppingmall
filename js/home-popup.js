const popup = document.querySelector('.popup');
const modal = document.querySelector('.modal');
const popupClose = document.querySelector('#popup-close');

const lockScroll = () => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
};

const unlockScroll = () => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
};

if (popup && modal) {
    lockScroll();
}

popupClose.addEventListener('click', () => {
    popup.classList.add('off');
    modal.classList.add('off');
    unlockScroll();
});