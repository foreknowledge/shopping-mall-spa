export default class ProductDetailPage {
  constructor($target, productId) {
    this.$target = $target;
    this.productId = productId;
  }

  render() {
    this.$target.innerHTML = `
        <div class="ProductDetailPage">
            <h1>커피잔 상품 정보 (${this.productId})</h1>
            <div class="ProductDetail"></div>
        </div>
    `;
  }
}
