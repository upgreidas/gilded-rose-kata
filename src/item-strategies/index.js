const BaseStrategy = require('./BaseStrategy');
const IncreasingQualityStrategy = require('./IncreasingQualityStrategy');
const BackstagePassStrategy = require('./BackstagePassStrategy');
const LegendaryStrategy = require('./LegendaryStrategy');

module.exports = {
  BaseStrategy: new BaseStrategy(),
  IncreasingQualityStrategy: new IncreasingQualityStrategy(),
  BackstagePassStrategy: new BackstagePassStrategy(),
  LegendaryStrategy: new LegendaryStrategy(),
};
