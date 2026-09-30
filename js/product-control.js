const saleUlTag = document.querySelector('.sale');
let result = productArray.map(product => {
    return `<li>
                <a href="#">
                <figure><img src="./img/${product.pthumbFileName}" alt="${product.pname}"></figure>
                <div class="sale-txt">
                    <h4 class="title-1">${product.pname}</h4>
                    <p class="desc-1">${product.pdesc}</p>
                    <div class="pay-frame">
                        <div class="pay-original">
                            <span>${won(product.price)}</span>원
                        </div>
                        <div class="pay-discount">
                            <div class="discount">${Math.round(product.pdiscount * 100)}%</div>
                            <div class="pay"><b>${won(product.priceDiscount)}</b>원</div>
                        </div>
                    </div>
                    <span class="like-badge noab">
                        <img src="./img/heart-2.svg" alt="좋아요하트">
                        <p>${product.plike}</p>
                    </span>
                </div>
                </a>
            </li>`
}).join('')

saleUlTag.innerHTML = result