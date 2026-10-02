const getHeader = () => document.querySelector('header.pc');
const getSmartOverlayMenu = () => document.querySelector('.smart-overlay-menu');

const toggleHeaderState = (headerEl = getHeader()) => {
    if (!headerEl) return false;

    const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const shouldCollapse = scrollY > 120;

    headerEl.classList.toggle('on', shouldCollapse);
    return true;
};

let headerScrollBound = false;

const bindHeaderScroll = () => {
    const headerEl = getHeader();
    if (!headerEl || headerScrollBound) return;

    toggleHeaderState(headerEl);
    window.addEventListener('scroll', () => toggleHeaderState(getHeader()), { passive: true });
    headerScrollBound = true;
};

const observer = new MutationObserver(() => {
    bindHeaderScroll();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

bindHeaderScroll();

document.addEventListener('mouseover', (e) => {
    const commonFrame = e.target.closest('header.pc .common-frame');
    if (!commonFrame) return;

    const headerEl = getHeader();
    if (!headerEl) return;

    if (headerEl.classList.contains('on')) {
        headerEl.classList.remove('on');
    }
}, true);

document.addEventListener('mouseout', (e) => {
    const commonFrame = e.target.closest('header.pc .common-frame');
    if (!commonFrame) return;

    const related = e.relatedTarget;
    const isStillInsideHeader = related && commonFrame.contains(related);

    if (isStillInsideHeader) return;

    toggleHeaderState(getHeader());
}, true);

// 문서에 이벤트 위임
document.addEventListener('click', (e) => {
    const smartOverlayMenu = getSmartOverlayMenu();
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