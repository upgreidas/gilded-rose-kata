const BaseStrategy = require('./BaseStrategy');
const IncreasingQualityStrategy = require('./IncreasingQualityStrategy');
const BackstagePassStrategy = require('./BackstagePassStrategy');

module.exports = {
  BaseStrategy: new BaseStrategy(),
  IncreasingQualityStrategy: new IncreasingQualityStrategy(),
  BackstagePassStrategy: new BackstagePassStrategy(),
};
