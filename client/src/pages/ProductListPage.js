import api from '../api.js';
import { formatCurrency } from '../utils.js';

export default class ProductListPage {
  constructor($target) {
    this.$target = $target;
  }

  async render() {
    this.$target.innerHTML = `
        <div class="ProductListPage">
            <h1>상품목록</h1>
            <ul></ul>
        </div>
    `;

    const products = await api.getProducts();
    this.renderProducts(products);

    this.$target.querySelector('ul').addEventListener('click', (e) => {
      const $li = e.target.closest('li');
      if (!$li) return;

      const productId = $li.id;
      const urlchangeEvent = new CustomEvent('urlchange', {
        detail: {
          path: `/web/products/${productId}`,
        },
      });
      window.dispatchEvent(urlchangeEvent);
    });
  }

  renderProducts(products) {
    const $productList = this.$target.querySelector('ul');
    products.forEach((product) => {
      const $li = document.createElement('li');
      $li.id = product.id;
      $li.className = 'Product';
      $li.innerHTML = `
        <img src="${product.imageUrl}">
        <div class="Product__info">
            <div>${product.name}</div>
            <div>${formatCurrency(product.price)}원~</div>
        </div>
    `;
      $productList.appendChild($li);
    });
  }
}
