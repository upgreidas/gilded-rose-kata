class BaseStrategy {
  constructor() {
    this.minQuality = 0;
    this.maxQuality = 50;
  }

  increaseQuality(item, value = 1) {
    item.quality = Math.min(item.quality + value, this.maxQuality);
  }

  decreaseQuality(item, value = 1) {
    item.quality = Math.max(item.quality - value, this.minQuality);
  }

  updateQuality(item) {
    const changeValue = item.sellIn < 0 ? 2 : 1;

    this.decreaseQuality(item, changeValue);
  }

  updateSellIn(item) {
    item.sellIn -= 1;
  }

  updateItem(item) {
    this.updateSellIn(item);
    this.updateQuality(item);
  }
}

module.exports = BaseStrategy;
