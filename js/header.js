const smartOverlayMenu = document.querySelector('.smart-overlay-menu');

// 문서에 이벤트 위임
document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('.btn-menu');
    if (openBtn && smartOverlayMenu) {
        e.preventDefault();
        smartOverlayMenu.classList.add('on');
        return;
    }

    const closeBtn = e.target.closest('.btn-menu-close');
    if (closeBtn && smartOverlayMenu) {
        e.preventDefault();
        smartOverlayMenu.classList.remove('on');
        return;
    }

    const smartLi = e.target.closest('.gnb-smart > li');
    if (!smartLi) return;

    const smartLists = [...document.querySelectorAll('.gnb-smart > li')];
    const gnb2depthSmarts = [...document.querySelectorAll('.gnb2depth-smart')];
    const idx = smartLists.indexOf(smartLi);

    if (idx === 0) return;

    e.preventDefault();
    smartLists.forEach((li) => li.classList.toggle('on', li === smartLi));
    gnb2depthSmarts.forEach((div, index) => {
        div.classList.toggle('on', index === idx - 1);
    });
});