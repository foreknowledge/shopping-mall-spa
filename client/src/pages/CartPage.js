export default class CartPage {
  constructor($target) {
    this.$target = $target;
  }

  render() {
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
  }
}
