const BaseStrategy = require('./BaseStrategy');

class BackstagePassStrategy extends BaseStrategy {
  updateQuality(item) {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      this.increaseQuality(item, 3);
    } else if (item.sellIn <= 10) {
      this.increaseQuality(item, 2);
    } else {
      this.increaseQuality(item);
    }
  }
}

module.exports = BackstagePassStrategy;
