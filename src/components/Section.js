export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._item = items;
  }
  renderItems() {
    this._item.forEach((elem) => {
      this._renderer(elem);
    });
  }

  addItems(item) {
    this._container.append(item);
  }

  prependItem(item) {
    this._container.prepend(item);
  }
}
