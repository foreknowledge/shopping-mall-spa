export default class NotFoundPage {
  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.$target.innerHTML = `
        <div class="NotFoundPage">
            <h1>404 Not Found</h1>
        </div>
    `;
  }
}
