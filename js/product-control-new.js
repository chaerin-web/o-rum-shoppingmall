const newUlTag = document.querySelector('.new-product');
let result = newProductArray.map(product => {
    return `<li>
                <a href="#">
                <figure><img src="./img/${product.pthumbFileName}" alt="${product.pname}"></figure>
                <div class="sale-txt">
                    <h4 class="title-1">${product.pname}</h4>
                    <p class="desc-1">${product.pdesc}</p>
                    <div class="pay-frame">
                        ${product.pdiscount?`<div class="pay-discount">
                            <div class="discount">${Math.round(product.pdiscount * 100)}%</div>
                            <div class="pay"><b>${formatNumberWithCommas(product.price)}</b>원</div>
                            </div>`
                            :`<div class="pay"><b>${formatNumberWithCommas(product.price)}</b>원</div>`}
                    </div>
                </div>
                </a>
            </li>
            `
}).join('')

newUlTag.innerHTML = result

// 숫자 세 자리마다 콤마를 찍어주는 헬퍼 함수
function formatNumberWithCommas(value, locale = 'ko-KR') {
    if (value === null || value === undefined) return '';
    const num = Number(value);
    if (Number.isNaN(num)) return String(value);
    return num.toLocaleString(locale);
}

// 전역에서 사용할 수 있도록 노출 (비모듈 환경용)
if (typeof window !== 'undefined') window.formatNumberWithCommas = formatNumberWithCommas;