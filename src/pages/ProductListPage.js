export default class ProductListPage {
  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.$target.innerHTML = `
        <div class="ProductListPage">
            <h1>상품목록</h1>
            <ul></ul>
        </div>
    `;
  }
}
