import api from '../api.js';
import { formatCurrency } from '../utils.js';

export default class ProductDetailPage {
  constructor($target, productId) {
    this.$target = $target;
    this.productId = productId;
    this.selectedOptions = [];
  }

  async render() {
    const product = await api.getProduct(this.productId);

    this.$target.innerHTML = `
        <div class="ProductDetailPage">
            <h1>${product.name} 상품 정보</h1>
            <div class="ProductDetail">
              <img src="${product.imageUrl}">
              <div class="ProductDetail__info">
                <h2>${product.name}</h2>
                <div class="ProductDetail__price">${formatCurrency(
                  product.price
                )}원~</div>
                <select>
                    <option>선택하세요.</option>
                    ${product.productOptions
                      .map((option) => {
                        let text = '';
                        if (option.stock == 0) text += '(품절) ';
                        text += `${product.name} ${option.name}`;
                        if (option.price > 0)
                          text += `(+${formatCurrency(option.price)}원)`;

                        return `<option value="${option.name}" ${
                          option.stock === 0 ? 'disabled' : ''
                        }>${text}</option>`;
                      })
                      .join('')}
                </select>
                <div class="ProductDetail__selectedOptions"></div>
              </div>
            </div>
        </div>
    `;
    this.renderSelectedOptions();

    // 상품 옵션 선택 이벤트 핸들러
    this.$target.querySelector('select').addEventListener('change', (e) => {
      const selectedOption = product.productOptions.find(
        (option) => option.name === e.target.value
      );
      if (!selectedOption) return;

      const alreadySelectedOption = this.selectedOptions.find(
        (option) => option.optionId === selectedOption.id
      );
      if (alreadySelectedOption) {
        alreadySelectedOption.quantity++;
      } else {
        this.selectedOptions.push({
          productId: product.id,
          productPrice: product.price + selectedOption.price,
          optionId: selectedOption.id,
          optionName: selectedOption.name,
          quantity: 1,
        });
      }
      this.renderSelectedOptions();
    });
  }

  renderSelectedOptions() {
    this.$target.querySelector('.ProductDetail__selectedOptions').innerHTML = `
      <h3>선택된 상품</h3>
      <ul>
      ${this.selectedOptions
        .map(
          (option) => `
            <li id=${option.optionId}>${option.optionName} ${option.productPrice}원
              <div><input type="number" value="${option.quantity}">개</div>
            </li>
        `
        )
        .join('')}
      </ul>
      <div class="ProductDetail__totalPrice">${this.calcTotalPrice()}원</div>
      <button class="OrderButton">주문하기</button>
    `;

    this.$target
      .querySelectorAll('.ProductDetail__selectedOptions input')
      .forEach(($el) => {
        $el.onchange = (e) => {
          if (e.target.value < 1) {
            e.target.value = 1;
          }

          const $li = e.target.closest('li');
          if (!$li) return;

          const optionId = parseInt($li.id);
          const selectedOption = this.selectedOptions.find(
            (option) => option.optionId === optionId
          );
          if (!selectedOption) return;

          selectedOption.quantity = e.target.value;
          this.renderSelectedOptions();
        };
      });
  }

  calcTotalPrice() {
    let price = 0;
    this.selectedOptions.forEach((option) => {
      price += option.productPrice * option.quantity;
    });
    return price;
  }
}
