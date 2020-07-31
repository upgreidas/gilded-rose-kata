const BaseStrategy = require('./BaseStrategy');

class IncreasingQualityStrategy extends BaseStrategy {
  updateQuality(item) {
    const changeValue = item.sellIn < 0 ? 2 : 1;

    this.increaseQuality(item, changeValue);
  }
}

module.exports = IncreasingQualityStrategy;
