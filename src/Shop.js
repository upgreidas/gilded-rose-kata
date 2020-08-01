const { BaseStrategy } = require('./item-strategies');
const itemVault = require('./itemVault');

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      Shop.updateSingleItem(item);
    });
  }

  static updateSingleItem(item, days = 1) {
    const strategy = itemVault[item.name] || BaseStrategy;

    for (let i = 0; i < days; i += 1) {
      strategy.updateItem(item);
    }
  }
}

module.exports = Shop;
