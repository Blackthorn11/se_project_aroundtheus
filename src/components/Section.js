export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderer = renderer;
    this._element = document.querySelector(selector);
    this._items = items;
  }
  renderItems() {
    this._items.forEach((elem) => {
      this._renderer(elem);
    });
  }

  addItems(item) {
    this._element.prepend(item);
  }
}
