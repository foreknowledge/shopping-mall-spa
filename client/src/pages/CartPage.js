import api from '../api.js';
import router from '../router.js';
import { loadData } from '../storage.js';
import { formatCurrency } from '../utils.js';

export default class CartPage {
  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.productsCart = loadData('products_cart') ?? [];

    if (this.productsCart.length === 0) {
      alert('장바구니가 비어있습니다.');
      router.navigateTo('/web/', true);
      return;
    }

    this.$target.innerHTML = `
       <div class="CartPage">
        <h1>장바구니</h1>
        <div class="Cart">
        <ul></ul>
        <div class="Cart__totalPrice">
            총 상품가격 0원
        </div>
        <button class="OrderButton">주문하기</button>
        </div>
      </div>
    `;

    this.renderCartItems();
  }

  async renderCartItems() {
    const cartData = await Promise.all(
      this.productsCart.map(async (item) => {
        const product = await api.getProduct(item.productId);
        const option = product.productOptions.find(
          (o) => o.id === item.optionId
        );
        return {
          productName: product.name,
          productImageUrl: product.imageUrl,
          productPrice: product.price + option.price,
          optionName: option.name,
          quantity: item.quantity,
        };
      })
    );

    const $cartList = this.$target.querySelector('.Cart ul');
    $cartList.innerHTML = `
      ${cartData
        .map(
          (item) => `
        <li class="Cart__item">
          <img src="${item.productImageUrl}">
          <div class="Cart__itemDesription">
            <div>${item.productName} ${item.optionName} ${formatCurrency(
            item.productPrice
          )}원 ${item.quantity}개</div>
            <div>${formatCurrency(item.productPrice * item.quantity)}원</div>
          </div>
        </li>
      `
        )
        .join('')}
    `;

    const totalPrice = cartData.reduce((acc, cur) => {
      return acc + cur.productPrice * cur.quantity;
    }, 0);

    const $totalPrice = this.$target.querySelector('.Cart__totalPrice');
    $totalPrice.innerHTML = `총 상품가격 ${formatCurrency(totalPrice)}원`;
  }
}
