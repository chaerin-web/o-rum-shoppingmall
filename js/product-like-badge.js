const likeBadges = document.querySelectorAll('.like-badge');

const toastBox = document.createElement('div');
toastBox.className = 'favorite-toast';
document.body.appendChild(toastBox);

const showFavoriteToast = (message) => {
    toastBox.textContent = message;
    toastBox.classList.add('show');

    clearTimeout(showFavoriteToast.timer);
    showFavoriteToast.timer = setTimeout(() => {
        toastBox.classList.remove('show');
    }, 1800);
};

likeBadges.forEach((badge) => {
    const likeImg = badge.querySelector('img');
    const likeNumber = badge.querySelector('p');

    if (!likeImg || !likeNumber) return;

    const defaultSrc = './img/heart-2.svg';
    const activeSrc = './img/heart-1.svg';
    let isLiked = false;
    let likeCount = Number.parseInt(likeNumber.textContent.trim(), 10) || 0;

    badge.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        isLiked = !isLiked;
        likeCount += isLiked ? 1 : -1;

        likeImg.src = isLiked ? activeSrc : defaultSrc;
        likeImg.alt = isLiked ? '좋아요 취소' : '좋아요하트';
        likeNumber.textContent = likeCount;

        const message = isLiked
            ? '찜한 상품에 추가되었습니다.'
            : '찜한 상품에서 삭제되었습니다.';

        showFavoriteToast(message);
    });
});