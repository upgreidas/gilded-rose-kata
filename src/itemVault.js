const { IncreasingQualityStrategy, BackstagePassStrategy, LegendaryStrategy } = require('./item-strategies');

const itemVault = {
  'Aged Brie': IncreasingQualityStrategy,
  'Backstage passes to a TAFKAL80ETC concert': BackstagePassStrategy,
  'Sulfuras, Hand of Ragnaros': LegendaryStrategy,
};

module.exports = itemVault;
