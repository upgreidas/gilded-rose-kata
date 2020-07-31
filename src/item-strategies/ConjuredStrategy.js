const BaseStrategy = require('./BaseStrategy');

class ConjuredStrategy extends BaseStrategy {
  updateQuality(item) {
    const changeValue = item.sellIn < 0 ? 4 : 2;

    this.decreaseQuality(item, changeValue);
  }
}

module.exports = ConjuredStrategy;
