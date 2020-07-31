const { BaseStrategy } = require('./item-strategies');
const itemVault = require('./itemVault');

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      const strategy = itemVault[item.name] || BaseStrategy;

      strategy.updateItem(item);
    });
  }
}

module.exports = Shop;
