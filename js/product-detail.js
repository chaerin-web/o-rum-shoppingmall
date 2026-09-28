// 신상품 목록에서 선택한 상품의 정보로 상세 화면을 표시합니다.
const selectedId = new URLSearchParams(window.location.search).get('pid');
const selectedProduct = selectedId !== null && /^\d+$/.test(selectedId)
    ? newProductArray.find(product => product.pid === Number(selectedId))
    : null;

if (selectedProduct) {
    const price = value => Math.round(value).toLocaleString('ko-KR');
    const salePrice = selectedProduct.price * (1 - selectedProduct.pdiscount);
    const imagePath = `./img/${selectedProduct.pthumbFileName}`;

    document.title = `${selectedProduct.pname} | O'RUM 쇼핑몰`;
    document.querySelector('meta[name="description"]').content = selectedProduct.pdesc;
    document.querySelector('meta[property="og:title"]').content = `${selectedProduct.pname} | O'RUM 쇼핑몰`;
    document.querySelector('meta[property="og:description"]').content = selectedProduct.pdesc;
    document.querySelector('meta[property="og:image"]').content = imagePath;

    const thumbnail = document.querySelector('.thumbnail-big img');
    thumbnail.src = imagePath;
    thumbnail.alt = selectedProduct.pname;
    // 다른 상품의 사진이 섞여 보이지 않도록 해당 상품의 대표 이미지만 노출합니다.
    document.querySelector('.horizontal-scroll-gallery').hidden = true;
    document.querySelector('.product-title').textContent = `[O'RUM] ${selectedProduct.pname}`;

    const productPay = document.querySelector('.product-pay');
    productPay.replaceChildren();
    if (selectedProduct.pdiscount) {
        const original = document.createElement('div');
        original.className = 'pay-original';
        original.textContent = `${price(selectedProduct.price)}원`;
        productPay.append(original);
    }
    const discounted = document.createElement('div');
    discounted.className = 'pay-discount';
    if (selectedProduct.pdiscount) {
        const rate = document.createElement('div');
        rate.className = 'discount';
        rate.textContent = `${Math.round(selectedProduct.pdiscount * 100)}%`;
        discounted.append(rate);
    }
    const currentPrice = document.createElement('div');
    currentPrice.className = 'pay';
    const number = document.createElement('b');
    number.textContent = price(salePrice);
    currentPrice.append(number, '원');
    discounted.append(currentPrice);
    productPay.append(discounted);
    document.querySelector('.pay-info b').textContent = price(salePrice);

    // 원래 고정 문구의 쿠폰·카드·포인트 가격은 선택한 상품과 일치하지 않습니다.
    document.querySelectorAll('.benefits .benefit:not(:last-child)').forEach(el => el.hidden = true);
    document.querySelector('.pay-info .tip-info').hidden = true;

    const summary = document.createElement('div');
    summary.className = 'product-detail-summary';
    const summaryImage = document.createElement('img');
    summaryImage.src = imagePath;
    summaryImage.alt = selectedProduct.pname;
    const summaryText = document.createElement('p');
    summaryText.textContent = selectedProduct.pdesc;
    summary.append(summaryImage, summaryText);
    document.querySelector('#product-detail-1').replaceChildren(summary);

    // 현재 자료에는 상품 ID와 일치하는 리뷰가 없으므로 기존 고정 리뷰를 재사용하지 않습니다.
    document.querySelector('#product-detail-2 .review').replaceChildren();
    const emptyReview = document.createElement('div');
    emptyReview.className = 'no-review';
    emptyReview.textContent = '아직 등록된 상품 리뷰가 없습니다.';
    document.querySelector('#product-detail-2').append(emptyReview);
}

// 직접 상세 페이지를 연 경우에도 기존 리뷰의 더보기 버튼이 동작하도록 합니다.
document.querySelectorAll('.btn-rvtxt').forEach(button => {
    button.addEventListener('click', () => {
        const review = button.closest('.review-txt');
        const folded = review.classList.toggle('fold');
        button.firstChild.textContent = folded ? '더보기' : '접기';
        button.setAttribute('aria-expanded', String(!folded));
    });
    button.setAttribute('aria-expanded', String(!button.closest('.review-txt').classList.contains('fold')));
});

const productTabs = document.querySelectorAll('.sticky-product-menu a');
productTabs.forEach(tab => tab.addEventListener('click', () => {
    productTabs.forEach(item => item.classList.remove('on'));
    tab.classList.add('on');
}));
