const {
  IncreasingQualityStrategy,
  BackstagePassStrategy,
  LegendaryStrategy,
  ConjuredStrategy,
} = require('./item-strategies');

const itemVault = {
  'Aged Brie': IncreasingQualityStrategy,
  'Backstage passes to a TAFKAL80ETC concert': BackstagePassStrategy,
  'Sulfuras, Hand of Ragnaros': LegendaryStrategy,
  'Conjured Magic Stick': ConjuredStrategy,
};

module.exports = itemVault;
